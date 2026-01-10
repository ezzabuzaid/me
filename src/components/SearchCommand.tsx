import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface SearchItem {
  id: string;
  title: string;
  url: string;
  type: 'page' | 'post' | 'tag';
  excerpt?: string;
  featured?: number;
  isFeatured?: boolean;
}

interface SearchCommandProps {
  items: SearchItem[];
}

export function SearchCommand({ items }: SearchCommandProps) {
  const isOpen = useSignal(false);
  const searchQuery = useSignal("");
  const selectedIndex = useSignal(0);

  // Filter and sort items based on search query
  const filteredItems = items
    .filter(item =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
    .sort((a, b) => {
      // If no search query, prioritize featured posts first
      if (!searchQuery.value) {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        // Within featured posts, sort by featured value (lower is better)
        if (a.isFeatured && b.isFeatured) {
          return (a.featured || 999) - (b.featured || 999);
        }
      }
      return 0;
    })
    .slice(0, 8); // Limit to 8 results

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen.value = true;
        selectedIndex.value = 0;
        return;
      }

      // Handle keyboard navigation when open
      if (isOpen.value) {
        if (e.key === 'Escape') {
          e.preventDefault();
          isOpen.value = false;
          searchQuery.value = "";
          selectedIndex.value = 0;
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectedIndex.value = Math.min(selectedIndex.value + 1, filteredItems.length - 1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const selected = filteredItems[selectedIndex.value];
          if (selected) {
            window.location.href = selected.url;
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems]);

  // Reset selected index when search changes
  useEffect(() => {
    selectedIndex.value = 0;
  }, [searchQuery.value]);

  const handleItemClick = (item: SearchItem) => {
    window.location.href = item.url;
  };

  const openSearch = () => {
    isOpen.value = true;
    selectedIndex.value = 0;
  };

  return (
    <>
      {/* Search Button - Brutalist Terminal Style */}
      <button
        onClick={openSearch}
        class="hidden md:flex items-center justify-start bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-primary-500/50 px-4 py-2 text-sm text-gray-500 hover:text-gray-300 transition-all duration-200 cursor-pointer w-40 lg:w-56 xl:w-64 font-mono"
      >
        <span class="text-primary-500 mr-2">$</span>
        <span class="hidden lg:inline-flex text-xs uppercase tracking-wider">search...</span>
        <span class="inline-flex lg:hidden text-xs uppercase tracking-wider">find</span>
        <div class="ml-auto flex items-center gap-1">
          <kbd class="bg-gray-800 border border-gray-700 px-1.5 py-0.5 text-xs font-mono text-gray-500">⌘</kbd>
          <kbd class="bg-gray-800 border border-gray-700 px-1.5 py-0.5 text-xs font-mono text-gray-500">K</kbd>
        </div>
      </button>

      {/* Command Palette Modal - Terminal Style */}
      {isOpen.value && (
        <div class="fixed inset-0 z-50 flex items-start justify-center pt-20">
          {/* Backdrop */}
          <div
            class="absolute inset-0 bg-black/80"
            onClick={() => {
              isOpen.value = false;
              searchQuery.value = "";
              selectedIndex.value = 0;
            }}
          />

          {/* Modal - No rounded corners, terminal aesthetic */}
          <div class="relative w-full max-w-lg mx-4 bg-gray-950 border border-gray-800 shadow-2xl">
            {/* Terminal Chrome */}
            <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900">
              <div class="w-3 h-3 bg-[#ff5f57]"></div>
              <div class="w-3 h-3 bg-[#ffbd2e]"></div>
              <div class="w-3 h-3 bg-[#28ca42]"></div>
              <span class="ml-3 font-mono text-xs text-gray-500 uppercase tracking-wider">search</span>
            </div>

            {/* Search Input */}
            <div class="flex items-center border-b border-gray-800">
              <span class="ml-4 text-primary-500 font-mono">$</span>
              <input
                type="text"
                placeholder="grep -r 'query'"
                value={searchQuery.value}
                onInput={(e) => searchQuery.value = (e.target as HTMLInputElement).value}
                class="flex-1 px-3 py-4 text-gray-100 placeholder-gray-600 bg-transparent border-0 focus:outline-none font-mono text-sm"
                autoFocus
              />
              <kbd class="mr-4 px-2 py-1 text-xs font-mono text-gray-600 bg-gray-900 border border-gray-800">ESC</kbd>
            </div>

            {/* Results */}
            <div class="max-h-80 overflow-y-auto">
              {filteredItems.length > 0 ? (
                <div class="py-2">
                  {filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      class={`px-4 py-3 cursor-pointer transition-all duration-150 ${
                        index === selectedIndex.value
                          ? 'bg-gray-900 border-l-2 border-primary-500'
                          : 'hover:bg-gray-900/50 border-l-2 border-transparent'
                      }`}
                    >
                      <div class="flex items-center space-x-3">
                        <span class={`font-mono text-xs ${item.type === 'post' ? 'text-cyan-500' : 'text-primary-500'}`}>
                          {item.type === 'post' ? '◇' : '▸'}
                        </span>
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center space-x-2">
                            <div class="text-sm text-gray-200 truncate font-[Fraunces]">
                              {item.title}
                            </div>
                            {item.isFeatured && (
                              <span class="inline-flex items-center px-1.5 py-0.5 text-xs font-mono text-primary-500 bg-primary-500/10 border border-primary-500/30 flex-shrink-0">
                                ★
                              </span>
                            )}
                          </div>
                          {item.excerpt && (
                            <div class="text-xs text-gray-600 truncate mt-1 font-mono">
                              {item.excerpt}
                            </div>
                          )}
                        </div>
                        <div class="font-mono text-xs text-gray-700 uppercase">
                          {item.type}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery.value ? (
                <div class="px-4 py-8 text-center">
                  <p class="font-mono text-sm text-gray-600">
                    <span class="text-primary-500">$</span> no results for "{searchQuery.value}"
                  </p>
                </div>
              ) : (
                <div class="px-4 py-8 text-center">
                  <p class="font-mono text-sm text-gray-600">
                    <span class="text-primary-500">$</span> type to search pages and posts...
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div class="px-4 py-3 border-t border-gray-800 text-xs text-gray-600 flex items-center justify-between font-mono">
              <div class="flex items-center space-x-4">
                <span class="flex items-center space-x-1">
                  <kbd class="px-1.5 py-0.5 bg-gray-900 border border-gray-800">↑↓</kbd>
                  <span>nav</span>
                </span>
                <span class="flex items-center space-x-1">
                  <kbd class="px-1.5 py-0.5 bg-gray-900 border border-gray-800">↵</kbd>
                  <span>select</span>
                </span>
              </div>
              <span class="text-gray-700">⌘K to open</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
