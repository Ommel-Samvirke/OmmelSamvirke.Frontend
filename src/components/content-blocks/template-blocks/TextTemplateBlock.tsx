import { GridContext } from '@/app/page-template-editor/context/GridContext';
import styles from './styles/TextTemplateBlock.module.scss';

import { forwardRef, ForwardedRef, useContext } from 'react';

const TextTemplateBlock = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    const gridContext = useContext(GridContext);
    
    return (
        <div ref={ref} className={styles.textContent} style={{ backgroundColor: gridContext.color }}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla non enim sed euismod.
                Nullam tincidunt ullamcorper nulla at laoreet. Donec hendrerit nunc et facilisis condimentum.
                Pellentesque accumsan ligula a dolor commodo bibendum. Nulla cursus tincidunt dui ac elementum.
                Maecenas ac congue felis, at pretium nisl. Donec sodales nibh nec lorem scelerisque, non pulvinar quam volutpat.
                Nam non congue tortor. Aliquam gravida bibendum lorem, eget elementum mi tempus venenatis. Nam ut euismod dolor.
                Vivamus lacinia arcu ac vehicula rutrum. Nulla consequat pellentesque ipsum at convallis. Morbi quis mollis odio, a pulvinar purus.
            </p>
            <p>
                Praesent ornare mollis ipsum non vulputate. Nullam eleifend lorem purus, vel ullamcorper lectus pellentesque vitae.
                Nunc ullamcorper rhoncus ipsum sed mollis. Nulla fringilla tortor libero, ac condimentum enim aliquam sit amet. 
                Aenean ut odio augue. Quisque sagittis auctor imperdiet. Duis in viverra eros, et mattis sem.
            </p>
        </div>
    );
});

export default TextTemplateBlock;