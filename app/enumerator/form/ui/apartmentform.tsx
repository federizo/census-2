"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Apartment = ({ formData, setFormData }: any) => {

    const apartmentHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;


        setFormData((prev: any) => ({
            ...prev,
            apartment: {
                ...prev.apartment,
                [name]: name === "doorsno" ? parseInt(value) || 0 : value.toUpperCase(),
            },
        }));
    };

    return (
      <div className="grid gap-3 w-full">
        <div className="flex flex-col gap-2">
          <label className="font-semibold tracking-wider">NO. OF DOORS</label>
          <input
            required
            type="text"
            name="doorsno"
            value={formData.apartment.doorsno}
            onChange={apartmentHandleChange}
            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold tracking-wider">NAME OF OWNER</label>
          <input
            required
            type="text"
            name="ownername"
            value={formData.apartment.ownername}
            onChange={apartmentHandleChange}
            className="text-white border-[0.5px] bg-transparent p-2 rounded w-full max-w-2xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold tracking-wider">HOUSE TYPE</label>
          <Select
            name="typeofhouse"
            value={formData.apartment.typeofhouse}
            onValueChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,
                apartment: { ...prev.apartment, typeofhouse: value },
              }))
            }
          >
            <SelectTrigger className="w-[180px] bg-black rounded">
              <SelectValue placeholder="Choose House Type" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white rounded">
              <SelectItem value="concrete">CONCRETE</SelectItem>
              <SelectItem value="kahoy">KAHOY</SelectItem>
              <SelectItem value="savage">SAVAGE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold tracking-wider">
            HOUSEHOLD TOILETS WITH
          </label>
          <Select
            name="householdtoilets"
            value={formData.apartment.householdtoilets}
            onValueChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,
                apartment: { ...prev.apartment, householdtoilets: value },
              }))
            }
          >
            <SelectTrigger className="w-[180px] bg-black rounded">
              <SelectValue placeholder="Choose House Type" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white rounded">
              <SelectItem value="watersealed">Water Sealed</SelectItem>
              <SelectItem value="openpit">Open Pit</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold tracking-wider">
            HOUSEHOLD SOURCE OF WATER
          </label>
          <Select
            name="sourceofwater"
            value={formData.apartment.sourceofwater}
            onValueChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,
                apartment: { ...prev.apartment, sourceofwater: value },
              }))
            }
          >
            <SelectTrigger className="w-[180px] bg-black rounded">
              <SelectValue placeholder="Choose House Type" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white rounded">
              <SelectItem value="pipe">PIPE/NAWASA</SelectItem>
              <SelectItem value="well">WELL/DEEP WELL</SelectItem>
              <SelectItem value="spring">SPRING</SelectItem>
              <SelectItem value="artesian">ARTESIAN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
};

export default Apartment