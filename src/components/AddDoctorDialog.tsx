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
import { supabase } from "@/integrations/supabase/client";

const AddDoctorDialog = () => {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user.id) return;

    const { error } = await supabase
      .from('doctors')
      .insert([
        { 
          name,
          experience,
          type,
          created_by: session.session.user.id
        }
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add doctor. Please try again.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Doctor has been added successfully",
    });
    setOpen(false);
    setName("");
    setExperience("");
    setType("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Doctor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
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
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Type of Doctor</Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Doctor</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorDialog;