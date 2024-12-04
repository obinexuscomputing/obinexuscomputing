import { TextFlowPattern } from "../types/patterns";

export const ZPattern: TextFlowPattern = {
  name: 'z',
  render: (content: any) => `
    <div class="z-pattern__content with-drop-cap">
      ${content.main}
    </div>
    <div class="z-pattern__content">
      ${content.secondary}
    </div>
  `,
  skeleton: () => `
    <div class="z-pattern__content">
      <div class="skeleton-text-group">
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
      </div>
    </div>
  `
}
