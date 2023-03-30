type props = {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {};
}

const ImageInput = ({onChangeHandler}: props): JSX.Element => {
  return (
    <input type="file" accept="image/*" onChange={onChangeHandler} />
  );
};

export default ImageInput 