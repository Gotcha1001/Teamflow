<MotionWrapperDelay
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}
viewport={{ amount: 0.3 }} >
<Webcam />
Welcome
</MotionWrapperDelay>

bullets showing

    className="text-sm break-words prose dark:prose-invert max-w-none [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6"
