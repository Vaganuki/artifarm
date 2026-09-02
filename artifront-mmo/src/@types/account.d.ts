export interface Account {
    username: string;
    email: string;
    member: boolean;
    member_expiration: string | null;
    status: 'standard' | 'founder' | 'gold_founder' | 'vip_founder' | 'goblin1';
    badges: [string];
    skins: [string];
    gems: number;
    member_token: number;
    achievement_points: number;
    banned: boolean;
    ban_reason: string;
}