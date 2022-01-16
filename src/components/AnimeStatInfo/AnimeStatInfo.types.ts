import { Anime } from '../../types/anime';

export interface AnimeStatInfoProps {
    anime?: Anime;
    isLoading?: boolean;
    statType: 'score' | 'rank' | 'popularity' | 'members';
}
