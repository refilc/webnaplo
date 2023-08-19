import { ReactNode } from 'react';

const TileCard = (props: { children: ReactNode[] }) => {
    return (
        <div className='flex flex-col p-[5px] items-center justify-center h-max text-white bg-white/[0.08] rounded-2xl w-full'>
            {props.children}
        </div>
    );
}

export default TileCard;