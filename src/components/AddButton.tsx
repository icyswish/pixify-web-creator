import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface AddButtonProps {
  label: string;
  onClick: () => void;
}

const AddButton = ({ label, onClick }: AddButtonProps) => {
  const { toast } = useToast();

  const handleClick = () => {
    onClick();
    toast({
      title: "Success",
      description: `${label} has been initiated.`,
    });
  };

  return (
    <Button onClick={handleClick} className="flex items-center gap-2">
      <Plus className="w-4 h-4" />
      {label}
    </Button>
  );
};

export default AddButton;