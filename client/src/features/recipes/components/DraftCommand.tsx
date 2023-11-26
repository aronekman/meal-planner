import { Link} from 'react-router-dom';

import { Button } from '@/common/components/Button';

type DraftCommandProps = {
  handleDelete: () => void;
  handlePublish: () => void;
  editLink: string
};

const DraftCommand = ({ handleDelete, handlePublish, editLink }: DraftCommandProps) => {
  return (
    <div className='mb-6 flex justify-end gap-4 p-4'>
      <Button variant='secondary' onClick={handleDelete} className='w-20'>
        Delete
      </Button>
      <Button variant='outline' className='w-20' asChild>
        <Link to={editLink}>Edit</Link>
      </Button>
      <Button onClick={handlePublish} className='w-20'>
        Publish
      </Button>
    </div>
  );
};

export default DraftCommand;
