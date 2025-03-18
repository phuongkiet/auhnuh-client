import "../layout/App.css"

function Footer() {
    return (
        <>
            <hr/>
            <div className="flex">
                <div className="justify-center text-center w-full py-5 z-10 bg-black">
                    <span
                        className="text-white">All rights reserved.<br/><span className="text-red-600"> © AuhNuh Streaming </span>{new Date().getFullYear()}</span>
                </div>
            </div>
        </>
    );
}

export default Footer;