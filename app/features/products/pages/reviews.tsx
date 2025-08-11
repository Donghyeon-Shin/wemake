import { Link, useParams } from 'react-router';

export default function ProductReviews() {
  const { productId } = useParams();

  // 샘플 리뷰 데이터
  const reviews = [
    {
      id: 1,
      author: '김개발',
      rating: 5,
      date: '2024-01-15',
      title: '정말 훌륭한 제품입니다!',
      content:
        '사용하기 쉽고 기능이 많아서 개발 효율이 크게 향상되었습니다. 특히 디버깅 기능이 정말 유용합니다.',
      helpful: 12,
    },
    {
      id: 2,
      author: '이코딩',
      rating: 4,
      date: '2024-01-10',
      title: '좋은 제품이지만 개선점이 있습니다',
      content:
        '전반적으로 만족스럽지만 UI가 조금 복잡합니다. 초보자도 쉽게 사용할 수 있도록 개선되면 좋겠습니다.',
      helpful: 8,
    },
    {
      id: 3,
      author: '박프로그래머',
      rating: 5,
      date: '2024-01-05',
      title: '팀 프로젝트에 최적화된 도구',
      content:
        '팀원들과 협업할 때 정말 유용합니다. 코드 리뷰 기능과 버전 관리가 잘 통합되어 있어요.',
      helpful: 15,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-6'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-gray-900'>제품 리뷰</h1>
            <Link
              to={`/${productId}/reviews/new`}
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
            >
              리뷰 작성
            </Link>
          </div>
          <p className='text-gray-600 mt-2'>
            제품 ID: {productId} - 총 {reviews.length}개의 리뷰
          </p>
        </div>

        <div className='space-y-6'>
          {reviews.map((review) => (
            <div key={review.id} className='bg-white rounded-lg shadow-md p-6'>
              <div className='flex items-start justify-between mb-4'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-1'>{review.title}</h3>
                  <div className='flex items-center space-x-2 mb-2'>
                    <div className='flex'>{renderStars(review.rating)}</div>
                    <span className='text-sm text-gray-600'>{review.rating}/5</span>
                  </div>
                  <p className='text-sm text-gray-500'>
                    {review.author} • {review.date}
                  </p>
                </div>
              </div>

              <p className='text-gray-700 leading-relaxed mb-4'>{review.content}</p>

              <div className='flex items-center justify-between'>
                <button className='flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors'>
                  <span>👍</span>
                  <span>도움됨 ({review.helpful})</span>
                </button>
                <button className='text-sm text-gray-600 hover:text-blue-600 transition-colors'>
                  답글 달기
                </button>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>📝</div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>아직 리뷰가 없습니다</h3>
            <p className='text-gray-600 mb-4'>이 제품의 첫 번째 리뷰를 작성해보세요!</p>
            <Link
              to={`/${productId}/reviews/new`}
              className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
            >
              리뷰 작성하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
