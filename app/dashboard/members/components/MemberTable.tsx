"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
import ListOfMembers from "./ListOfMembers";
import Table from "@/components/ui/Table";
import { readMembers } from "../actions";
import getServerSideCookies from "./cookies/cookies";

export default function MemberTable() {
  const tableHeader = ["Name", "Role", "Joined", "Status"];
  const [isAdmin, setIsAdmin] = useState<any>();
  const [permissions, setPermission] = useState<any>();

  const fetchMembers = async () => {
    try {
      const { data: fetchedPermissions } = await readMembers();

      setPermission(fetchedPermissions);
    } catch (error) {
      console.error("Error fetching members:", error);
      return <div>Error loading members. Please try again later.</div>;
    }
    if (permissions?.length === 0) {
      return <div>No members found.</div>;
    }
  };
  useEffect(() => {
    // Get the specific cookie by name
    setIsAdmin(getServerSideCookies());
  }, []);
  console.log(isAdmin);
  useEffect(() => {
    fetchMembers();
  }, []);

  function refresh() {
    fetchMembers();
  }

  return (
    <Table headers={tableHeader} refresh={refresh}>
      <ListOfMembers isAdmin={isAdmin} permissions={permissions} />
    </Table>
  );
}
