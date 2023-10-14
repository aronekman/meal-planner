import background from '../assets/background.jpg'

const Background = () => {
    return (
        <div className="fixed w-screen h-screen -z-50">
            <img src={background} className='fixed h-[80%] w-full object-cover object-bottom opacity-70'/>
            <div className='fixed w-full h-full bg-gradient-to-b from-transparent to-stone-300'></div>
        </div>
    )
}

export { Background }