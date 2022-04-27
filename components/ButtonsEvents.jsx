import { motion } from 'framer-motion';

export default function ButtonsEvents(props) {
  console.log(props.activeButton);
  return (
    <>
      <motion.button
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
        className={props.activeButton === 'Incoming' ? 'filters__button active' : 'filters__button'}
        onClick={() => props.setActiveButton('Incoming')}>
        {props.value1}
      </motion.button>
      <motion.button
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
        className={props.activeButton === 'Like' ? 'filters__button active' : 'filters__button'}
        onClick={() => props.setActiveButton('Like')}>
        {props.value2}
      </motion.button>
      <motion.button
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
        className={props.activeButton === 'Saved' ? 'filters__button active' : 'filters__button'}
        onClick={() => props.setActiveButton('Saved')}>
        {props.value3}
      </motion.button>
    </>
  );
}
