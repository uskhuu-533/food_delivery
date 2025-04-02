import { useCategory } from "@/provider/CategoryProvider";
import { useFood } from "@/provider/FoodProvider";
import { useLoading } from "@/provider/LoaderProvider";
import { DialogClose } from "@radix-ui/react-dialog"
import { Trash } from "lucide-react"

const DeleteFood = ({foodId}: {foodId:string}) => {
    const {setLoading} = useLoading()
    const { deleteFood} = useFood()
    const {refetchCategory}=useCategory()
      const handleDeleteFood = async () => {
        setLoading(true);
        await deleteFood(foodId);
         await refetchCategory()
         setLoading(false)
      };
    return(
        <DialogClose onClick={handleDeleteFood} className="w-[10%] bg-[#E11D481A] border border-[#EF4444] rounded-md py-2 flex justify-center">
        <Trash stroke="#EF4444"/>
      </DialogClose>
    )
}
export default DeleteFood