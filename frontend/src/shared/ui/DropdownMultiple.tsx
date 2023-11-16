import { Combobox, Transition } from "@headlessui/react";
import ChevronSvg from "@/assets/chevron.svg";
import CheckSvg from "@/assets/check.svg";
import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { twMerge } from "tailwind-merge";
import { toJS } from "mobx";

interface ComboboxMultipleProps<T> {
  value: T[];
  onChange: (value: T[]) => void;
  options: readonly T[];
  render: (value: T) => string;
  label?: string;
  placeholder?: string;
}

const DropdownMultiple = observer(<T,>(p: ComboboxMultipleProps<T>) => {
  const [query, setQuery] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const filteredOptions =
    query === ""
      ? p.options
      : p.options.filter((option) =>
          p
            .render(option)
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const placeholder = p.value.map((v) => p.render(v)).join(", ");
  const selectedOptions = useMemo(
    () => p.options.filter((v) => p.value.some((vv) => p.render(vv) === p.render(v))),
    [p.value, p.options]
  );

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setInputFocused(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <Combobox value={selectedOptions} multiple onChange={p.onChange}>
      <div className="relative text-sm">
        {p.label && (
          <Combobox.Label className="text-text-primary/60 text-base">{p.label}</Combobox.Label>
        )}
        <div className={twMerge("relative h-fit flex items-center w-full", p.label && "mt-3")}>
          <Combobox.Input
            className="whitespace-nowrap w-full cursor-pointer pr-8 text-ellipsis border border-text-primary/20 rounded-lg p-3"
            placeholder={placeholder}
            onClick={() => setInputFocused((v) => !v)}
            onFocus={(e) => {
              if (e.relatedTarget === null) return;

              e.preventDefault();
              setQuery("");
              setInputFocused(true);
            }}
            onBlur={() => setInputFocused(false)}
            displayValue={(value: T[]) => (inputFocused ? "" : placeholder)}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="h-5 w-5 absolute right-2 text-text-primary/60">
            <ChevronSvg />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100 delay-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          show={inputFocused}
          afterLeave={() => setQuery("")}>
          <Combobox.Options
            className="absolute z-10 mt-1 max-h-60 w-full border border-text-primary/20 overflow-auto rounded-xl py-2 bg-white"
            style={{
              scrollbarWidth: "thin"
            }}>
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="px-4 py-2 text-text-secondary">Ничего не найдено</div>
            ) : (
              filteredOptions.map((option, index) => (
                <Combobox.Option
                  key={index}
                  value={option}
                  className={({ active }) =>
                    twMerge(
                      "p-2 cursor-pointer flex justify-between hover:bg-text-primary/5",
                      active && "bg-primary/5"
                    )
                  }>
                  {({ selected, active }) => (
                    <>
                      <span>{p.render(option)}</span>
                      {/* {active && "актив"} */}
                      {selected && <CheckSvg className="w-5 h-5" />}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
            {}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
});

export default DropdownMultiple;
