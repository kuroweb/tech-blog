import { TagResponse } from '../../types/tag';

type Props = {
  tag: TagResponse;
};

const TagButton = ({ tag }: Props) => {
  return (
    <>
      <p>{tag.name}</p>
    </>
  );
};

export default TagButton;
