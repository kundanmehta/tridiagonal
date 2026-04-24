import os

def fix_imports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.js', '.jsx')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Look for the broken pattern
                    # import {
                    # import { API_URL } from '@/lib/apiConfig';
                    broken_pattern = "import {\nimport { API_URL } from '@/lib/apiConfig';"
                    fixed_pattern = "import { API_URL } from '@/lib/apiConfig';\nimport {"
                    
                    if broken_pattern in content:
                        print(f"Fixing {path}...")
                        new_content = content.replace(broken_pattern, fixed_pattern)
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                    
                    # Also check for variations with different line endings or slightly different spacing
                    # Sometimes there are spaces after 'import {'
                    # Use a more robust check if needed
                    
                except Exception as e:
                    print(f"Error reading {path}: {e}")

if __name__ == "__main__":
    fix_imports(r'd:\tridiagonal\frontend')
