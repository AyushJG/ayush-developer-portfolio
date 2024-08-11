import React, { useState } from "react";

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", message: "" });

  const sendMessage = () => {
    const trimmedName = name.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    let error = false;
    let newErrors = { name: "", message: "" };

    if (trimmedName.length === 0) {
      newErrors.name = "Name must not be empty!";
      error = true;
    }

    if (trimmedMessage.length === 0) {
      newErrors.message = "Message must not be empty!";
      error = true;
    }

    if (error) {
      setErrors(newErrors);
      return;
    }

    setSending(true);

    const mailtoUrl = `mailto:?to=${encodeURIComponent(
      trimmedName
    )}&subject=${encodeURIComponent(trimmedSubject)}&body=${encodeURIComponent(
      trimmedMessage
    )}`;

    window.location.href = mailtoUrl;
    setSending(false);
  };

  return (
    <div className="w-full h-full relative flex flex-col bg-ub-cool-grey text-white select-none">
      <div className="flex items-center justify-between w-full bg-ub-gedit-light bg-opacity-60 border-b border-t border-blue-400 text-sm">
        <span className="font-bold ml-2">Send a Message to Me</span>
        <div className="flex">
          <button
            onClick={sendMessage}
            className="border border-black bg-black bg-opacity-50 px-3 py-0.5 my-1 mx-1 rounded hover:bg-opacity-80"
          >
            Send
          </button>
        </div>
      </div>
      <div className="relative flex-grow flex flex-col bg-ub-gedit-dark font-normal windowMainScreen">
        <div className="absolute left-0 top-0 h-full px-2 bg-ub-gedit-darker"></div>
        <div className="relative">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-ubt-gedit-orange focus:bg-ub-gedit-light outline-none font-medium text-sm pl-6 py-0.5 bg-transparent"
            placeholder={errors.name || "Your Email / Name :"}
            spellCheck="false"
            autoComplete="off"
            type="text"
          />
        </div>
        <div className="relative">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full my-1 text-ubt-gedit-blue focus:bg-ub-gedit-light gedit-subject outline-none text-sm font-normal pl-6 py-0.5 bg-transparent"
            placeholder="Subject (may be a feedback for me)"
            spellCheck="false"
            autoComplete="off"
            type="text"
          />
        </div>
        <div className="relative flex-grow">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full gedit-message font-light text-sm resize-none h-full windowMainScreen outline-none tracking-wider pl-6 py-1 bg-transparent"
            placeholder={errors.message || "Message"}
            spellCheck="false"
            autoComplete="none"
          />
        </div>
      </div>
      {sending && (
        <div className="flex justify-center items-center animate-pulse h-full w-full bg-gray-400 bg-opacity-30 absolute top-0 left-0">
          <img
            className="w-8 absolute animate-spin"
            src="./themes/Yaru/status/process-working-symbolic.svg"
            alt="Ubuntu Process Symbol"
          />
        </div>
      )}
    </div>
  );
};

export default Contact;

export const displayContact = () => {
  return <Contact />;
};
