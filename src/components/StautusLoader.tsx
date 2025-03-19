import { Loader2 } from "lucide-react"

const StatusLoader = () => {
    return(
        <div className="flex gap-1">
            <Loader2 className="animate-spin" />
          Changing...
          </div>
    )
}
export default StatusLoader