import { Button } from '@/common/components/Button';

type SavedCommandProps = {
    handleUnsave: () => void;
  };

const SavedCommand = ({ handleUnsave }: SavedCommandProps) => {
  return (
    <div className='mb-6 flex justify-end p-4'>
    <Button onClick={handleUnsave} className='w-20' variant='outline'>
      Unsave
    </Button>
  </div>
  );
};

export default SavedCommand;
