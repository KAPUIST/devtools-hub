export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export interface RegexTestResult {
  success: boolean;
  matches?: RegexMatch[];
  error?: string;
}

export function testRegex(pattern: string, flags: string, testString: string): RegexTestResult {
  if (!pattern) {
    return { success: false, error: 'Pattern is empty' };
  }

  if (!testString) {
    return { success: true, matches: [] };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes('g')) {
      // Global flag: find all matches
      let match;
      while ((match = regex.exec(testString)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        });
      }
    } else {
      // Non-global: find first match only
      const match = regex.exec(testString);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        });
      }
    }

    return { success: true, matches };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid regular expression',
    };
  }
}

export const commonPatterns = [
  {
    name: 'Email',
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    flags: 'g',
    example: 'Contact: test@example.com, support@company.org',
  },
  {
    name: 'URL',
    pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    flags: 'gi',
    example: 'Visit https://example.com or http://www.test.org',
  },
  {
    name: 'Phone (US)',
    pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}',
    flags: 'g',
    example: 'Call (123) 456-7890 or 987-654-3210',
  },
  {
    name: 'Phone (KR)',
    pattern: '0\\d{1,2}-?\\d{3,4}-?\\d{4}',
    flags: 'g',
    example: '010-1234-5678, 02-123-4567, 031-1234-5678',
  },
  {
    name: 'IPv4 Address',
    pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
    flags: 'g',
    example: 'Server IPs: 192.168.1.1, 10.0.0.255',
  },
  {
    name: 'Date (YYYY-MM-DD)',
    pattern: '\\d{4}-\\d{2}-\\d{2}',
    flags: 'g',
    example: 'Events: 2024-11-03, 2025-01-15',
  },
  {
    name: 'Date (MM/DD/YYYY)',
    pattern: '\\d{1,2}\\/\\d{1,2}\\/\\d{4}',
    flags: 'g',
    example: 'Dates: 11/03/2024, 1/15/2025',
  },
  {
    name: 'Time (HH:MM)',
    pattern: '([01]?[0-9]|2[0-3]):[0-5][0-9]',
    flags: 'g',
    example: 'Schedule: 09:30, 14:45, 23:59',
  },
  {
    name: 'Hex Color',
    pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b',
    flags: 'g',
    example: 'Colors: #FF5733, #FFF, #00FF00',
  },
  {
    name: 'HTML Tag',
    pattern: '<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)',
    flags: 'gi',
    example: '<div>Content</div>, <img src="test.jpg" />, <p class="text">Hello</p>',
  },
  {
    name: 'Credit Card',
    pattern: '\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}',
    flags: 'g',
    example: '1234 5678 9012 3456, 1234-5678-9012-3456',
  },
  {
    name: 'Username (@mention)',
    pattern: '@[a-zA-Z0-9_]+',
    flags: 'g',
    example: 'Hey @john_doe and @alice123!',
  },
  {
    name: 'Hashtag',
    pattern: '#[a-zA-Z0-9_]+',
    flags: 'g',
    example: 'Trending: #javascript #webdev #coding',
  },
  {
    name: 'Number (Integer)',
    pattern: '-?\\d+',
    flags: 'g',
    example: 'Values: 42, -17, 0, 999',
  },
  {
    name: 'Number (Decimal)',
    pattern: '-?\\d+\\.\\d+',
    flags: 'g',
    example: 'Prices: 19.99, -5.5, 0.99',
  },
];
