import { Metadata } from 'next';
import Link from 'next/link';
import styles from './questions.module.css';

export const metadata: Metadata = {
  title: 'Questions - Tech Stack Overflow',
  description: 'Browse all questions on Tech Stack Overflow',
};

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

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
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface PostsResponse {
  data: Post[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

async function getPosts(searchParams: { [key: string]: string | undefined }): Promise<PostsResponse> {
  const page = searchParams.page || '1';
  const sort = searchParams.sort || 'latest';
  const search = searchParams.search || '';
  const tag = searchParams.tag || '';

  const params = new URLSearchParams({
    page,
    sort,
    ...(search && { search }),
    ...(tag && { tag }),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?${params}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const postsData = await getPosts(searchParams);
  const currentSort = searchParams.sort || 'latest';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>All Questions</h1>
        <Link href="/questions/create" className={styles.askButton}>
          Ask Question
        </Link>
      </div>

      <div className={styles.controls}>
        <div className={styles.stats}>
          <span>{postsData.total.toLocaleString()} questions</span>
        </div>

        <div className={styles.filters}>
          <Link
            href="/questions?sort=latest"
            className={currentSort === 'latest' ? styles.active : ''}
          >
            Latest
          </Link>
          <Link
            href="/questions?sort=popular"
            className={currentSort === 'popular' ? styles.active : ''}
          >
            Popular
          </Link>
          <Link
            href="/questions?sort=votes"
            className={currentSort === 'votes' ? styles.active : ''}
          >
            Most Voted
          </Link>
          <Link
            href="/questions?sort=unanswered"
            className={currentSort === 'unanswered' ? styles.active : ''}
          >
            Unanswered
          </Link>
        </div>
      </div>

      <div className={styles.questionsList}>
        {postsData.data.map((post) => (
          <article key={post.id} className={styles.questionCard}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{post.votes_count}</span>
                <span className={styles.statLabel}>votes</span>
              </div>
              <div
                className={`${styles.stat} ${
                  post.answers_count > 0 ? styles.hasAnswers : ''
                }`}
              >
                <span className={styles.statNumber}>{post.answers_count}</span>
                <span className={styles.statLabel}>answers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{post.views_count}</span>
                <span className={styles.statLabel}>views</span>
              </div>
            </div>

            <div className={styles.content}>
              <h2>
                <Link href={`/questions/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className={styles.excerpt}>
                {post.content.substring(0, 200)}
                {post.content.length > 200 ? '...' : ''}
              </p>

              <div className={styles.meta}>
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
                  <span className={styles.points}>
                    {post.user.points} pts
                  </span>
                  <time className={styles.time}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {postsData.last_page > 1 && (
        <div className={styles.pagination}>
          {postsData.current_page > 1 && (
            <Link
              href={`/questions?page=${postsData.current_page - 1}&sort=${currentSort}`}
              className={styles.paginationButton}
            >
              Previous
            </Link>
          )}

          <span className={styles.paginationInfo}>
            Page {postsData.current_page} of {postsData.last_page}
          </span>

          {postsData.current_page < postsData.last_page && (
            <Link
              href={`/questions?page=${postsData.current_page + 1}&sort=${currentSort}`}
              className={styles.paginationButton}
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
