import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function NewReview() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    rating: 5,
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 실제 구현에서는 API 호출을 여기에 추가
      console.log('리뷰 제출:', { productId, ...formData });

      // 성공 시 리뷰 목록 페이지로 이동
      setTimeout(() => {
        navigate(`/${productId}/reviews`);
      }, 1000);
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type='button'
        onClick={() => handleRatingChange(i + 1)}
        className={`text-2xl transition-colors ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        } hover:text-yellow-400`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>리뷰 작성</h1>
          <p className='text-gray-600'>제품 ID: {productId}</p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-2'>
                리뷰 제목 *
              </label>
              <input
                type='text'
                id='title'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='리뷰 제목을 입력하세요'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>평점 *</label>
              <div className='flex items-center space-x-2'>
                <div className='flex space-x-1'>{renderStars(formData.rating)}</div>
                <span className='text-sm text-gray-600 ml-2'>{formData.rating}/5</span>
              </div>
            </div>

            <div>
              <label htmlFor='content' className='block text-sm font-medium text-gray-700 mb-2'>
                리뷰 내용 *
              </label>
              <textarea
                id='content'
                name='content'
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={6}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical'
                placeholder='제품에 대한 상세한 리뷰를 작성해주세요. 사용 경험, 장단점, 추천 여부 등을 포함하면 좋습니다.'
              />
            </div>

            <div className='flex space-x-4'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? '제출 중...' : '리뷰 제출'}
              </button>
              <button
                type='button'
                onClick={() => navigate(`/${productId}/reviews`)}
                className='flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors'
              >
                취소
              </button>
            </div>
          </form>

          {isSubmitting && (
            <div className='mt-4 text-center'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2'></div>
              <p className='text-sm text-gray-600'>리뷰를 제출하고 있습니다...</p>
            </div>
          )}
        </div>

        <div className='mt-6 bg-blue-50 rounded-lg p-4'>
          <h3 className='text-sm font-medium text-blue-900 mb-2'>리뷰 작성 가이드라인</h3>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• 구체적이고 객관적인 경험을 공유해주세요</li>
            <li>• 제품의 장점과 단점을 균형있게 작성해주세요</li>
            <li>• 다른 사용자에게 도움이 되는 정보를 포함해주세요</li>
            <li>• 부적절하거나 모욕적인 내용은 삼가해주세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
