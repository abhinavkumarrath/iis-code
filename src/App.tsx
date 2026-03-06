import { output1, output2, output3, output4, output5, output6 } from "./CodeOutputs";
import { Capsule } from "./components/Capsule";
import CodeBlock from "./components/CodeBlock";
import { Intro } from "./components/Intro";
import { Navbar } from "./components/Navbar";
import { Code } from "./icons/Code";
import { File } from "./icons/File";
import { code1, code2, code3, code4, code5, code6 } from "./PracticalCodes";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="sticky mt-10 md:mt-0 top-0 z-10 bg-black/10 backdrop-blur-md py-1 shadow-md">
                <div className="mt-2 mb-4 gap-x-4 flex justify-center">
                    <Capsule
                        text="Watch Detailed Explanation on My Youtube"
                        variant="cap1"
                        onClick={() => { window.alert("UPLOADING SOON!"); }}
                        startIcon={<File />}
                    />
                    <Capsule
                        text="Try out Python Code"
                        variant="cap2"
                        onClick={() => { window.open("https://www.programiz.com/python-programming/online-compiler"); }}
                        startIcon={<Code />}
                    />
                </div>
            </div>

            <Intro />

            <div>
                <CodeBlock title="1. Caesar Cipher Algorithm" code={code1} output={output1} />
                <CodeBlock title="2. Playfair Cipher Algorithm" code={code2} output={output2} />
                <CodeBlock title="3. Hill Cipher Algorithm" code={code3} output={output3} />
                <CodeBlock title="4. RSA Cipher Algorithm" code={code4} output={output4} />
                <CodeBlock title="5. Diffie-Hellman Algorithm" code={code5} output={output5} />
                <CodeBlock title="Stay Tuned!" code={code6} output={output6} />
            </div>

            <div className="text-center pb-20"> {/* Added a little padding-bottom (pb-20) here so the button doesn't cover the text! */}
                <h1 className="text-white text-3xl md:text-6xl lg:text-5xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
                    <span className="bg-gradient-to-r from-emerald-400 via-orange-600 to-blue-400 bg-clip-text text-transparent cursor-pointer">All the best! Regards, Shubhashish ;)</span>
                </h1>
            </div>
            <ScrollToTop />
        </div>
    )
}