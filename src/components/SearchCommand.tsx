import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface SearchItem {
  id: string;
  title: string;
  url: string;
  type: 'page' | 'post';
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
      {/* Search Button */}
      <button
        onClick={openSearch}
        class="hidden md:flex items-center justify-start bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-sm text-gray-600 dark:text-gray-400 transition-colors cursor-pointer shadow-sm w-40 lg:w-56 xl:w-64"
      >
        <span class="hidden lg:inline-flex">Search pages...</span>
        <span class="inline-flex lg:hidden">Search...</span>
        <div class="ml-auto flex items-center gap-1">
          <kbd class="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5 text-xs font-mono font-medium">⌘</kbd>
          <kbd class="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5 text-xs font-mono font-medium">K</kbd>
        </div>
      </button>

      {/* Command Palette Modal */}
      {isOpen.value && (
        <div class="fixed inset-0 z-50 flex items-start justify-center pt-20">
          {/* Backdrop */}
          <div
            class="absolute inset-0 bg-black/50 dark:bg-black/70"
            onClick={() => {
              isOpen.value = false;
              searchQuery.value = "";
              selectedIndex.value = 0;
            }}
          />

          {/* Modal */}
          <div class="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
            {/* Search Input */}
            <div class="flex items-center border-b border-gray-200 dark:border-gray-700">
              <svg class="ml-4 w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for pages..."
                value={searchQuery.value}
                onInput={(e) => searchQuery.value = (e.target as HTMLInputElement).value}
                class="flex-1 px-4 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-0 focus:outline-none text-sm"
                autoFocus
              />
              <kbd class="mr-4 px-2 py-1 text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">ESC</kbd>
            </div>

            {/* Results */}
            <div class="max-h-80 overflow-y-auto">
              {filteredItems.length > 0 ? (
                <div class="py-2">
                  {filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      class={`px-4 py-3 cursor-pointer transition-colors ${
                        index === selectedIndex.value
                          ? 'bg-primary-50 dark:bg-primary-900/20 border-l-2 border-primary-500'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div class="flex items-center space-x-3">
                        <div class={`w-2 h-2 rounded-full ${item.type === 'post' ? 'bg-blue-500' : 'bg-green-500'}`} />
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center space-x-2">
                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {item.title}
                            </div>
                            {item.isFeatured && (
                              <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400 flex-shrink-0">
                                ★
                              </span>
                            )}
                          </div>
                          {item.excerpt && (
                            <div class="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                              {item.excerpt}
                            </div>
                          )}
                        </div>
                        <div class="text-xs text-gray-400 dark:text-gray-500 uppercase">
                          {item.type}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery.value ? (
                <div class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <div class="text-sm">No results found for "{searchQuery.value}"</div>
                </div>
              ) : (
                <div class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <div class="text-sm">Type to search pages and posts...</div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <span class="flex items-center space-x-1">
                  <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span class="flex items-center space-x-1">
                  <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↵</kbd>
                  <span>Select</span>
                </span>
              </div>
              <span>⌘K to open</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}