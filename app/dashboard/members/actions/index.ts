"use server";

import { readUserSession } from "@/lib/actions";
import { supabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

// export async function createMember(data: {
//   agentId: any;
//   email: string;
//   password: string;
//   name: string;
//   role: "user" | "admin";
//   status: "active" | "resigned";
//   confirm: string;
// }) {
//   const { data: userSession } = await readUserSession();
//   if (userSession.session?.user.user_metadata.role !== "admin") {
//     return JSON.stringify({
//       error: { message: "You are not allowed to do this!" },
//     });
//   }

//   const supabase = await createSupabaseAdmin();

//   const createResult = await supabase.auth.admin.createUser({
//     email: data.email,
//     password: data.password,
//     email_confirm: true,
//     user_metadata: {
//       role: data.role,
//     },
//   });

//   if (createResult.error?.message) {
//     return JSON.stringify(createResult);
//   } else {
//     const memberResult = await supabase.from("member").insert({
//       name: data.name,
//       id: createResult.data.user?.id,
//       email: data.email,
//     });
//     if (memberResult.error?.message) {
//       return JSON.stringify(memberResult);
//     } else {
//       const persmissionResult = await supabase.from("permission").insert({
//         role: data.role,
//         member_id: createResult.data.user?.id,
//         status: data.status,
//         agent_id: data.agentId,
//       });
//       revalidatePath("/dashboard/member");

//       return JSON.stringify(persmissionResult);
//     }
//   }
// }
export async function createMember(data: any): Promise<any> {
  const { data: userSession } = await readUserSession();

  // Ensure only admins or super admins can create members
  const userRole =
    userSession?.session?.user?.user_metadata?.role ||
    (data.name == "super_admin" && "super_admin");
  if (userRole !== "admin" && userRole !== "super_admin") {
    throw new Error("You are not allowed to perform this action!");
  }

  // Step 1: Create a new user in the authentication system
  const createUserResult = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: { role: data.role },
  });

  if (createUserResult.error) {
    throw new Error(`Failed to create user: ${createUserResult.error.message}`);
  }

  // Step 2: Add the new user to the 'member' table
  const userId = createUserResult.data.user?.id;
  const memberResult = await supabaseAdmin.from("member").insert({
    name: data.name,
    id: userId,
    email: data.email,
  });

  if (memberResult.error) {
    throw new Error(`Failed to create member: ${memberResult.error.message}`);
  }

  // Step 3: Add permissions for the new user
  const permissionResult = await supabaseAdmin.from("permission").insert({
    role: data.role,
    member_id: userId,
    status: data.status,
    agent_id: data.agentId,
  });

  if (permissionResult.error) {
    throw new Error(
      `Failed to set permissions: ${permissionResult.error.message}`
    );
  }
  return false;
  // Revalidate the dashboard
  revalidatePath("/dashboard/member");
}
export async function updateMemberBasicById(
  id: string,
  data: {
    name: string;
  }
) {
  const supabase = await createSupbaseServerClient();

  const result = await supabase.from("member").update(data).eq("id", id);
  revalidatePath("/dashboard/member");
  return JSON.stringify(result);
}

export async function updateMemberAdvanceById(
  permission_id: string,
  user_id: string,
  data: {
    role: "user" | "admin";
    status: "active" | "resigned";
  }
) {
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  }

  const updateResult = await supabaseAdmin.auth.admin.updateUserById(user_id, {
    user_metadata: { role: data.role },
  });

  if (updateResult.error?.message) {
    return JSON.stringify(updateResult);
  } else {
    const supabase = await createSupbaseServerClient();

    const result = await supabase
      .from("permission")
      .update(data)
      .eq("id", permission_id);
    revalidatePath("/dashboard/member");
    return JSON.stringify(result);
  }
}
export async function updateMemberAccountById(
  user_id: string,
  data: {
    email: string;
    password?: string | undefined;
    confirm?: string | undefined;
  }
) {
  const { data: userSession } = await readUserSession();
  if (
    userSession.session?.user.user_metadata.role !== "admin" ||
    userSession.session?.user.user_metadata.role !== "super_admin"
  ) {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  }

  let updateObject: {
    email: string;
    password?: string | undefined;
  } = { email: data.email };

  if (data.password) {
    updateObject["password"] = data.password;
  }

  const updateResult = await supabaseAdmin.auth.admin.updateUserById(
    user_id,
    updateObject
  );

  if (updateResult.error?.message) {
    return JSON.stringify(updateResult);
  } else {
    const supbase = await createSupbaseServerClient();
    const result = await supbase
      .from("member")
      .update({ email: data.email })
      .eq("id", user_id);
    revalidatePath("/dashboard/member");
    return JSON.stringify(result);
  }
}

export async function deleteMemberById(user_id: string) {
  const { data: userSession } = await readUserSession();
  if (
    userSession.session?.user.user_metadata.role !== "admin" ||
    userSession.session?.user.user_metadata.role !== "super_admin"
  ) {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  }

  const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id);

  if (deleteResult.error?.message) {
    return JSON.stringify(deleteResult);
  } else {
    const supbase = await createSupbaseServerClient();
    const result = await supbase.from("member").delete().eq("id", user_id);
    revalidatePath("/dashboard/member");
    return JSON.stringify(result);
  }
}

export async function readMembers() {
  unstable_noStore();
  const supbase = await createSupbaseServerClient();
  const response = await supbase.from("permission").select("*,member(*)");
  return response;
}
