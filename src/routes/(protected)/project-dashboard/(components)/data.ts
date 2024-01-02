import {
	ArrowDown,
	ArrowRight,
	ArrowUp,
	CheckCircle2,
	Circle,
	XCircle,
	HelpCircle,
	Timer
} from 'lucide-svelte';

export const labels = [
	{
		value: 'bug',
		label: 'Bug'
	},
	{
		value: 'feature',
		label: 'Feature'
	},
	{
		value: 'documentation',
		label: 'Documentation'
	}
];

export const statuses = [
	{
		value: 'ongoing',
		label: 'Ongoing',
		icon: HelpCircle
	},
	{
		value: 'not started',
		label: 'Not Started',
		icon: Circle
	},
	{
		value: 'in progress',
		label: 'In Progress',
		icon: Timer
	},
	{
		value: 'completed',
		label: 'Completed',
		icon: CheckCircle2
	},
	{
		value: 'canceled',
		label: 'Canceled',
		icon: XCircle
	}
];

export const priorities = [
	{
		label: 'Low',
		value: 'low',
		icon: ArrowDown
	},
	{
		label: 'Medium',
		value: 'medium',
		icon: ArrowRight
	},
	{
		label: 'High',
		value: 'high',
		icon: ArrowUp
	}
];
