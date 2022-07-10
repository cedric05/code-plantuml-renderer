import type * as MarkdownIt from 'markdown-it';
import type { RendererContext } from 'vscode-notebook-renderer';

interface MarkdownItRenderer {
    extendMarkdownIt(fn: (md: MarkdownIt) => void): void;
}

export async function activate(ctx: RendererContext<void>) {
    const markdownItRenderer = await ctx.getRenderer('vscode.markdown-it-renderer') as MarkdownItRenderer | undefined;
    if (!markdownItRenderer) {
        throw new Error(`Could not load 'vscode.markdown-it-renderer'`);
    }

    const plantuml = require('markdown-it-plantuml');
    markdownItRenderer.extendMarkdownIt((md: MarkdownIt) => {
        return md.use(plantuml, {});
    })
}
 