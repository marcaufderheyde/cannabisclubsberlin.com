import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { getTranslations } from 'next-intl/server';
import { getClubMetadata } from './getClubMetadata';

jest.mock('@/app/helpers/clubsListContent');
jest.mock('next-intl/server');

describe('getClubMetadata', () => {
  const mockClub = {
    slug: 'test-club',
    description: 'Test club description',
    offerings: 'Test club offerings',
    name: 'Test Club',
  };

  const mockTranslations = {
    'test-club.description': 'Test club description',
    'test-club.offerings': 'Test club offerings',
    'test-club.meta_description': 'Test club meta description',
    'test-club.meta_keywords': 'test, club, keywords',
  };

  beforeEach(() => {
    jest.resetAllMocks();

    (pullClubsListContent as jest.Mock).mockReturnValue([mockClub]);
    (getTranslations as jest.Mock).mockResolvedValue((key: string) => {
      return mockTranslations[key as keyof typeof mockTranslations] || key;
    });
  });

  it('should return metadata for an existing club', async () => {
    const result = await getClubMetadata('test-club');

    expect(result).toEqual({
      title: 'Test Club',
      description: 'Test club meta description',
      keywords: 'test, club, keywords, Test Club',
    });

    expect(pullClubsListContent).toHaveBeenCalledTimes(1);
    expect(getTranslations).toHaveBeenCalledWith('ClubsPage');
  });

  it('should return undefined for a non-existent club', async () => {
    const result = await getClubMetadata('non-existent-club');

    expect(result).toBeUndefined();

    expect(pullClubsListContent).toHaveBeenCalledTimes(1);
    expect(getTranslations).toHaveBeenCalledWith('ClubsPage');
  });

  it('should update club description and offerings', async () => {
    await getClubMetadata('test-club');

    expect(mockClub.description).toBe('Test club description');
    expect(mockClub.offerings).toBe('Test club offerings');
  });

  it('should handle translation errors', async () => {
    (getTranslations as jest.Mock).mockRejectedValue(new Error('Translation error'));

    await expect(getClubMetadata('test-club')).rejects.toThrow('Translation error');
  });
});