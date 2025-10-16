export default function BucketEmpty({ message }) {
  return (
    <tr>
      <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
        {message}
      </td>
    </tr>
  );
}
