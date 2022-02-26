import { FloorContext, UserContext } from '@/pages/floormap';
import { Empty } from 'antd';
import { getDownloadURL, ref, StorageReference } from 'firebase/storage';
import { useContext, useEffect, useState, VFC } from 'react';
import { useStorage } from 'reactfire';

const FloorImage: VFC = () => {
  const floor = useContext(FloorContext);
  if (floor.hasImage) {
    console.log('has image');
    return <FloorImageChild />;
  } else {
    return (
      <div
        style={{
          height: '80px',
          width: '70%',
          backgroundColor: '#EEEEEE',
          textAlign: 'center',
        }}
      >
        no image
      </div>
    );
  }
};

const FloorImageChild: VFC = () => {
  const user = useContext(UserContext);
  const floor = useContext(FloorContext);
  const storage = useStorage();
  const [imageURL, setImageURL] = useState<string>('');
  const imageRef = ref(storage, `${user.uid}/floor/${floor.ID}`);

  const getStorageDownloadURL = async (imageRef: StorageReference) => {
    getDownloadURL(imageRef)
      .then((url) => {
        setImageURL(url);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('url is', imageURL);
  };
  useEffect(() => {
    getStorageDownloadURL(imageRef);
  });

  return imageURL != null ? (
    <img src={imageURL} width="100%" />
  ) : (
    <p>loading..</p>
  );
};

export default FloorImage;
