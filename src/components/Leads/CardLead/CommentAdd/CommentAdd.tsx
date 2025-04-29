import { FormEvent } from 'react';
import styles from './CommentAdd.module.css';
import Button from '@/ui/Button/Button';

const CommentAdd = ({
  comment,
  setComment,
  addComment,
  info,
}: {
  comment: string;
  setComment: (value: string) => void;
  addComment: (e: FormEvent) => void;
  info: string | null;
}) => {
  return (
    <form className={styles.main} onSubmit={addComment}>
      <div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Введите ваш комментарий" className={styles.textarea} />
        <Button color="green" type="submit" className={styles.button}>
          <img src="/imgs/Comment/send.svg" alt="Отправить" />
        </Button>
      </div>

      {info && <p className={styles.info}>{info}</p>}
    </form>
  );
};

export default CommentAdd;
