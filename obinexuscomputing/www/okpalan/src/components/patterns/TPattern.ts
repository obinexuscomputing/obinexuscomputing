import { TextFlowPattern } from "../types/patterns";

export const TPattern: TextFlowPattern = {
    name: 't',
    render: (content: any) => `
      <div class="t-pattern__header with-drop-cap">
        ${content.header}
      </div>
      <div class="t-pattern__content">
        <div class="t-pattern__section with-drop-cap">
          ${content.main}
        </div>
        <div class="t-pattern__section">
          ${content.secondary}
        </div>
      </div>
    `,
    skeleton: () => `
      <div class="t-pattern__header">
        <div class="skeleton-text-group">
          <div class="skeleton-text"></div>
        </div>
      </div>
      <div class="t-pattern__content">
        <div class="t-pattern__section">
          <div class="skeleton-text-group">
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
      </div>
    `
  }