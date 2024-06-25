import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function BackButton(props: any) {
  const navigate = useNavigate();
  return (
    <div
      className={`mb-5 flex items-center cursor-pointer hover:font-bold duration-100 w-[80%] md:w-[50%]`}
      onClick={() => navigate(-1)}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      <h1 className="text-md md:text-2xl text-black ml-5 align-middle">
        {props.title ?? 'Kembali'}
      </h1>
    </div>
  );
}
export default BackButton;
