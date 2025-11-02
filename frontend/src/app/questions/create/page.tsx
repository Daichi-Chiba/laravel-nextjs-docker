"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/axios';
import styles from './page.module.css';

// Markdownエディタ関連のインポート
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CreateQuestionPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // カンマ区切りで入力
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return null; // 認証状態のロード中、または未認証の場合は何も表示しない
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/posts', {
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      });
      router.push('/'); // 投稿成功後、ホームページへリダイレクト
    } catch (err: any) {
      setError(err.response?.data?.message || '質問の投稿に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createQuestionPage}>
      <Card className={styles.createQuestionPage__card}>
        <CardHeader>
          <h1 className={styles.createQuestionPage__title}>質問を投稿する</h1>
        </CardHeader>
        <CardContent>
          {error && (
            <div className={styles.createQuestionPage__error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.createQuestionPage__formGroup}>
              <label htmlFor="title" className={styles.createQuestionPage__label}>
                タイトル
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="質問のタイトルを入力してください"
                className={styles.createQuestionPage__input}
              />
            </div>

            <div className={styles.createQuestionPage__formGroup}>
              <label htmlFor="content" className={styles.createQuestionPage__label}>
                内容 (Markdown)
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="質問の詳細をMarkdown形式で入力してください"
                className={styles.createQuestionPage__textarea}
              />
            </div>

            <div className={styles.createQuestionPage__formGroup}>
              <label htmlFor="tags" className={styles.createQuestionPage__label}>
                タグ (カンマ区切り)
              </label>
              <Input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="例: javascript, react, nextjs"
                className={styles.createQuestionPage__input}
              />
            </div>

            <Button type="submit" variant="primary" disabled={loading} className={styles.createQuestionPage__button}>
              {loading ? '投稿中...' : '質問を投稿'}
            </Button>
          </form>

          <div className={styles.createQuestionPage__previewSection}>
            <h2>プレビュー</h2>
            <div className={styles.createQuestionPage__previewContent}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
