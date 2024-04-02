import { Url } from 'next/dist/shared/lib/router/router';
import { Key } from 'react';

export default interface LinkInfo {
    name: Key | null | undefined;
    href: Url;
}
