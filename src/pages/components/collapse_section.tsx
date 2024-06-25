import { useCollapse } from 'react-collapsed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

function CollapseSection(props: any) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className="w-full mb-5 border border-black p-3 rounded-lg hover:bg-slate-100">
      <div className="px-2 flex justify-between" {...getToggleProps()}>
        <div
          className={`title text-md md:text-xl ${
            isExpanded ? 'font-bold' : 'font-normal'
          }`}
        >
          {props.title}
        </div>
        <div className="icon">
          <FontAwesomeIcon
            icon={isExpanded ? faArrowUp : faArrowDown}
          ></FontAwesomeIcon>
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div
          className={`${isExpanded ? 'mt-3' : ''} rounded-lg ${
            props.background ?? 'bg-gray-200'
          }`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default CollapseSection;
