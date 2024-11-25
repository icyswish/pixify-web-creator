import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useApp } from "@/contexts/AppContext";

const AddPatientDialog = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { addPatient } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPatient();
    toast({
      title: "Success",
      description: "Patient has been added successfully",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="disease">Type of Disease</Label>
            <Input
              id="disease"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Patient</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;