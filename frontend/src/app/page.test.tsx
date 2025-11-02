import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', { name: /✅ Next.js ホットリロード成功！/i });
    expect(heading).toBeInTheDocument();
  });
});
