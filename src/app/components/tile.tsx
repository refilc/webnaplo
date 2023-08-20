import { ReactNode } from 'react';

const Tile = (props: { leading: ReactNode, title: string, description: string, trailing: ReactNode, className: string }) => {
    return (
        <div className={'flex flex-row py-2 items-center justify-between w-full h-max hover:bg-white/[0.05] rounded-xl gap-2 cursor-pointer max-w-[400px] ' + props.className}>
            {props.leading}
            <div className='flex flex-col w-[90%]'>
                <p className='font-medium whitespace-nowrap text-ellipsis overflow-hidden'>{props.title}</p>
                <p className='text-[14px] opacity-70 whitespace-nowrap text-ellipsis overflow-hidden'>{props.description}</p>
            </div>
            {props.trailing}
        </div>
    );
}

export default Tile;