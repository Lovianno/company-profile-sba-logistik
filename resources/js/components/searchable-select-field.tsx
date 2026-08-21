import { Check, ChevronsUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type SearchableSelectOption = {
    label: string;
    value: string;
};

type SearchableSelectFieldProps = {
    id?: string;
    options: SearchableSelectOption[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    className?: string;
    'aria-invalid'?: boolean;
};

export function SearchableSelectField({
    id,
    options,
    value,
    onValueChange,
    placeholder = 'Pilih data',
    searchPlaceholder = 'Cari data...',
    emptyMessage = 'Data tidak ditemukan.',
    disabled = false,
    className,
    'aria-invalid': ariaInvalid,
}: SearchableSelectFieldProps) {
    const [open, setOpen] = useState(false);

    const selectedOption = useMemo(
        () => options.find((option) => option.value === value),
        [options, value],
    );

    const handleSelect = (selectedValue: string) => {
        onValueChange(selectedValue);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={disabled}>
                <Button
                    id={id}
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-invalid={ariaInvalid}
                    disabled={disabled}
                    className={cn(
                        'w-full justify-between px-3 font-normal',
                        !selectedOption && 'text-muted-foreground',
                        className,
                    )}
                >
                    <span className="truncate">
                        {selectedOption?.label ?? placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="w-(--radix-popover-trigger-width) p-0"
            >
                <Command>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        autoFocus
                    />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={`${option.label} ${option.value}`}
                                    onSelect={() => handleSelect(option.value)}
                                >
                                    <Check
                                        className={cn(
                                            'size-4',
                                            value === option.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    <span className="truncate">
                                        {option.label}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
