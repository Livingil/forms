import { useRef, useEffect, useState } from "react";
import { useOptimistic, useActionState } from "react";
import styles from "./comments-section.module.css";

export interface Comment {
  id: number;
  text: string;
  timestamp: Date;
}

interface CommentsSectionProps {
  initialComments?: Comment[];
}

async function addCommentAction(
  prevComments: Comment[],
  formData: FormData,
): Promise<Comment[]> {
  const text = formData.get("comment") as string;

  if (!text.trim()) throw new Error("Комментарий не может быть пустым");
  if (text.length > 500)
    throw new Error("Комментарий не может превышать 500 символов");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (Math.random() < 0.2) {
    throw new Error("Ошибка сервера: не удалось отправить комментарий");
  }

  return [
    ...prevComments,
    {
      id: Date.now(),
      text: text.trim(),
      timestamp: new Date(),
    },
  ];
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  initialComments = [],
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string | null>(null);

  const [comments, formAction, isPending] = useActionState(
    addCommentAction,
    initialComments,
  );

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    Comment[],
    string
  >(comments, (state, text) => [
    ...state,
    {
      id: -1,
      text,
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    if (!isPending && formRef.current) {
      const lastComment = comments[comments.length - 1];
      if (lastComment && lastComment.timestamp.getTime() > Date.now() - 2000) {
        formRef.current.reset();
        textareaRef.current?.focus();
      }
    }
  }, [isPending, comments]);

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get("comment") as string;
    if (!text.trim()) return;

    addOptimisticComment(text);
    setError(null);

    try {
      await formAction(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Комментарии ({optimisticComments.length})
      </h2>

      <div className={styles.commentsList}>
        {optimisticComments.length === 0 ? (
          <p className={styles.emptyMessage}>
            Нет комментариев. Будьте первым!
          </p>
        ) : (
          optimisticComments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.author}>Анонимный пользователь</span>
                <span className={styles.timestamp}>
                  {comment.timestamp.toLocaleString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </div>
              <p className={styles.commentText}>{comment.text}</p>
              {comment.id === -1 && (
                <div className={styles.optimisticBadge}>Отправляется...</div>
              )}
            </div>
          ))
        )}
      </div>

      <form ref={formRef} action={handleSubmit} className={styles.form}>
        <label className={styles.label}>Добавить комментарий</label>
        <textarea
          ref={textareaRef}
          name="comment"
          className={styles.textarea}
          placeholder="Напишите ваш комментарий..."
          rows={4}
          maxLength={500}
          disabled={isPending}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className={styles.spinner} />
              Отправка...
            </>
          ) : (
            "Отправить"
          )}
        </button>
      </form>
    </div>
  );
};
