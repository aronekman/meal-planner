import { Link} from 'react-router-dom';

import { Button } from '@/common/components/Button';

type PublishedCommandProps = {
    handleDelete: () => void;
    handleUnPublish: () => void;
    editLink: string
  };

const PublishedCommand = ({ handleDelete, handleUnPublish, editLink }: PublishedCommandProps) => {
  return (
    <div className='mb-6 flex justify-end gap-4 p-4'>
      <Button className="w-20" variant="secondary" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="outline" className="w-20" asChild>
        <Link to={editLink}>Edit</Link>
      </Button>
      <Button className="w-20" onClick={handleUnPublish} variant="outline">
        Unpublish
      </Button>
    </div>
  );
};

export default PublishedCommand;
