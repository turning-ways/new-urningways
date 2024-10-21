import MightKnow from "./extras/mightknow";
import Notifications from "./extras/notifications";
import Suggested from "./extras/suggested";

export default function Extras() {
  return (
    <div className="flex flex-col gap-2">
      <Notifications/>
      <MightKnow/>
      <Suggested/>
    </div>
  )
}
