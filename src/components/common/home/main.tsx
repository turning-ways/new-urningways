import Create from './posts/create';
import Post from './posts/post';

export default function Main() {
  return (
    <div className="flex flex-col gap-2">
      <Create />
      <Post />
    </div>
  );
}
