# CSS設計ガイドライン

このプロジェクトでは、CSSの設計手法として **CSS Modules** と **BEM** を組み合わせたアプローチを採用します。

---

### 1. 基本方針

- **CSS Modules**: コンポーネントごとにCSSファイルを分割し、クラス名のスコープをローカルに限定することで、スタイルの衝突を防ぎます。
- **BEM**: クラス名を構造的かつ意味的に保つための命名規則です。予測しやすく、堅牢なCSSを実現します。

### 2. BEM命名規則

BEMは、`Block`, `Element`, `Modifier` の3つの要素で構成されます。

- **Block**: 独立したコンポーネントのルート要素です。
  - 例: `.card`, `.form`, `.button`
- **Element**: Blockを構成する要素です。Block名とアンダースコア2つで繋ぎます。
  - 例: `.card__title`, `.form__input`, `.button__icon`
- **Modifier**: BlockやElementの状態やバリエーションを示します。ハイフン2つで繋ぎます。
  - 例: `.card--dark`, `.button--primary`, `.button--disabled`

### 3. ファイル構成

- コンポーネントのスタイルは、コンポーネントファイルと同じ階層に `[ComponentName].module.css` という名前で作成します。

  ```
  src/
  └── components/
      └── Button/
          ├── Button.tsx
          └── Button.module.css
  ```

- プロジェクト全体で共通のスタイル（CSS変数、リセットCSS、基本的なタイポグラフィなど）は `src/app/globals.css` に記述します。

### 4. 実装例

#### `Button.module.css`

```css
/* Block */
.button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

/* Modifier (Primary) */
.button--primary {
  background-color: #0070f3;
  color: #fff;
  border-color: #0070f3;
}

/* Modifier (Disabled) */
.button--disabled {
  background-color: #eaeaea;
  color: #ccc;
  cursor: not-allowed;
}

/* Element */
.button__icon {
  margin-right: 8px;
}
```

#### `Button.tsx`

```tsx
import styles from './Button.module.css';
import clsx from 'clsx'; // 複数のクラスを結合するためのユーティリティ

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({ children, primary, disabled, icon }: ButtonProps) => {
  const buttonClasses = clsx(
    styles.button, // Block
    primary && styles['button--primary'], // Modifier
    disabled && styles['button--disabled'] // Modifier
  );

  return (
    <button className={buttonClasses} disabled={disabled}>
      {icon && <span className={styles.button__icon}>{icon}</span>} {* Element *}
      {children}
    </button>
  );
};
```
