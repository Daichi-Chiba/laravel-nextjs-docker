import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from './question.module.css';

interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  views_count: number;
  votes_count: number;
  answers_count: number;
  created_at: string;
  user: {
    id: number;
    name: string;
    points: number;
    rank: {
      name: string;
      color: string;
      icon: string;
    } | null;
    badges: Array<{
      id: number;
      name: string;
      icon: string;
      color: string;
    }>;
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  answers: Array<{
    id: number;
    content: string;
    is_best: boolean;
    votes_count: number;
    created_at: string;
    user: {
      id: number;
      name: string;
      points: number;
      rank: {
        name: string;
        color: string;
        icon: string;
      } | null;
    };
  }>;
}

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`,
    {
      cache: 'no-store', // SSR: Always fetch fresh data
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return res.json();
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `${post.title} - Tech Stack Overflow`,
    description: post.content.substring(0, 160),
  };
}

export default async function QuestionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <div className={styles.container}>
      <div className={styles.questionSection}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <div className={styles.author}>
            <span className={styles.authorName}>{post.user.name}</span>
            {post.user.rank && (
              <span
                className={styles.rank}
                style={{ color: post.user.rank.color }}
              >
                {post.user.rank.name}
              </span>
            )}
            <span className={styles.points}>{post.user.points} pts</span>
          </div>

          <div className={styles.stats}>
            <span>Asked {new Date(post.created_at).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.views_count} views</span>
          </div>
        </div>

        <div className={styles.questionBody}>
          <div className={styles.voting}>
            <button className={styles.voteButton}>▲</button>
            <span className={styles.voteCount}>{post.votes_count}</span>
            <button className={styles.voteButton}>▼</button>
          </div>

          <div className={styles.content}>
            <ReactMarkdown>{post.content}</ReactMarkdown>

            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/questions?tag=${tag.slug}`}
                  className={styles.tag}
                >
                  {tag.name}
                </Link>
              ))}
            </div>

            {post.user.badges && post.user.badges.length > 0 && (
              <div className={styles.badges}>
                <span className={styles.badgesLabel}>Badges:</span>
                {post.user.badges.map((badge) => (
                  <span
                    key={badge.id}
                    className={styles.badge}
                    style={{ borderColor: badge.color }}
                    title={badge.name}
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.answersSection}>
        <h2 className={styles.answersTitle}>
          {post.answers_count} {post.answers_count === 1 ? 'Answer' : 'Answers'}
        </h2>

        {post.answers.map((answer) => (
          <div
            key={answer.id}
            className={`${styles.answer} ${
              answer.is_best ? styles.bestAnswer : ''
            }`}
          >
            {answer.is_best && (
              <div className={styles.bestBadge}>✓ Best Answer</div>
            )}

            <div className={styles.answerBody}>
              <div className={styles.voting}>
                <button className={styles.voteButton}>▲</button>
                <span className={styles.voteCount}>{answer.votes_count}</span>
                <button className={styles.voteButton}>▼</button>
              </div>

              <div className={styles.content}>
                <ReactMarkdown>{answer.content}</ReactMarkdown>

                <div className={styles.answerMeta}>
                  <span className={styles.answeredBy}>
                    answered by <strong>{answer.user.name}</strong>
                  </span>
                  {answer.user.rank && (
                    <span
                      className={styles.rank}
                      style={{ color: answer.user.rank.color }}
                    >
                      {answer.user.rank.name}
                    </span>
                  )}
                  <span className={styles.points}>
                    {answer.user.points} pts
                  </span>
                  <time className={styles.time}>
                    {new Date(answer.created_at).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.answerFormSection}>
        <h2>Your Answer</h2>
        <p className={styles.notice}>
          Please <Link href="/login">log in</Link> to post an answer.
        </p>
      </div>
    </div>
  );
}
