import styles from "./styles/TextBlockComponent.module.scss";

import React, {
    ForwardedRef,
    forwardRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { LayoutContext } from "@/features/pages/context/LayoutContext";
import { loremIpsum } from "lorem-ipsum";

const TextBlockComponent = forwardRef(
    (_, ref: ForwardedRef<HTMLDivElement>) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [text, setText] = useState("");
        const layoutContext = useContext(LayoutContext);

        useEffect(() => {
            const newText = generateText();
            setText(newText);
        }, []);

        useEffect(() => {
            const resizeObserver = new ResizeObserver(() => {
                const newText = generateText();
                setText(newText);
            });

            if (containerRef.current) {
                resizeObserver.observe(containerRef.current);
            }

            return () => {
                if (containerRef.current) {
                    resizeObserver.unobserve(containerRef.current);
                }
            };
        }, []);

        const generateText = () => {
            if (containerRef.current) {
                const rootFontSize = parseInt(
                    getComputedStyle(document.documentElement).fontSize,
                    10,
                );
                const lineHeightInPx = 1.5 * (rootFontSize || 16);

                const height = containerRef.current.offsetHeight;
                const width = containerRef.current.offsetWidth;

                const avgCharArea = 14 * lineHeightInPx;

                const containerArea = width * height;
                const estimatedChars = Math.floor(containerArea / avgCharArea);

                const estimatedWords = Math.floor(estimatedChars / 5);

                const rawText = loremIpsum({
                    count: estimatedWords,
                    units: "words",
                    format: "plain",
                });

                const wordsPerParagraph = 50;

                const paragraphs = [];
                const words = rawText.split(" ");

                while (words.length > 0) {
                    const segment = words
                        .splice(0, wordsPerParagraph)
                        .join(" ");
                    paragraphs.push(segment);
                }

                return paragraphs.join("\n\n");
            }
            return "";
        };

        return (
            <div
                ref={ref}
                className={styles.textContainer}
                style={{ backgroundColor: layoutContext.color }}
            >
                <div ref={containerRef} className={styles.textContent}>
                    {text.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    },
);

TextBlockComponent.displayName = "TextBlock";

export default TextBlockComponent;
