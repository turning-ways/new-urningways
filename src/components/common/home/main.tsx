import Create from './posts/create';
import Posts from './posts/posts';

export default function Main() {
  return (
    <div className="flex flex-col gap-2">
      <Create />
      <Posts />
    </div>
  );
}
