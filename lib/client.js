window.__ModuleLoader__.load({ id: "dsh-providers", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let __deepseek_ai_dsh_client_web_react = require("@deepseek-ai/dsh-client-web-react");
__deepseek_ai_dsh_client_web_react = __toESM(__deepseek_ai_dsh_client_web_react);
let react = require("react");
react = __toESM(react);
let __deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
__deepseek_ai_dsh_client_ui_primitives = __toESM(__deepseek_ai_dsh_client_ui_primitives);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);

//#region \0dsh-css:src/client/AccountsSection.module.css.mjs
const css = ".uSSQ4q_section{flex-direction:column;gap:12px;height:100%;min-height:0;display:flex}.uSSQ4q_intro{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:20px}.uSSQ4q_search{width:100%}.uSSQ4q_list{flex-direction:column;flex:1;gap:16px;min-height:0;padding-right:4px;display:flex;overflow-y:auto}.uSSQ4q_group{flex-direction:column;gap:4px;display:flex}.uSSQ4q_groupLabel{color:var(--dsw-alias-label-tertiary);margin:0;padding:0 2px 2px;font-size:12px;font-weight:400;line-height:18px}.uSSQ4q_row{border:1px solid #0000;border-radius:10px}.uSSQ4q_rowOpen{border-color:var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}.uSSQ4q_rowSummary{width:100%;min-height:36px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:none;border-radius:10px;align-items:center;gap:10px;padding:6px 12px;font-size:13px;display:flex}.uSSQ4q_rowSummary:hover{background:var(--dsw-alias-interactive-bg-hover)}.uSSQ4q_glyph{color:currentColor;flex-shrink:0}.uSSQ4q_darkOnly{display:none}body[data-ds-dark-theme] .uSSQ4q_darkOnly{display:revert}body[data-ds-dark-theme] .uSSQ4q_lightOnly{display:none}.uSSQ4q_monogram{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border-radius:5px;flex-shrink:0;justify-content:center;align-items:center;font-size:10px;font-weight:600;line-height:1;display:inline-flex}.uSSQ4q_rowName{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}.uSSQ4q_rowStatus{color:var(--dsw-alias-label-tertiary);flex-shrink:0;font-size:12px}.uSSQ4q_chevron,.uSSQ4q_chevronOpen{color:var(--dsw-alias-label-tertiary);flex-shrink:0;transition:transform .15s}.uSSQ4q_chevronOpen{transform:rotate(180deg)}.uSSQ4q_badge{background:var(--dsw-alias-state-business-tertiary);height:18px;color:var(--dsw-alias-state-business-primary);border-radius:4px;flex-shrink:0;align-items:center;padding:0 6px;font-size:11px;line-height:18px;display:inline-flex}.uSSQ4q_card{flex-direction:column;gap:12px;padding:2px 12px 14px;display:flex}.uSSQ4q_meta{color:var(--dsw-alias-label-tertiary);flex-wrap:wrap;align-items:baseline;gap:6px;margin:0;font-size:12px;line-height:18px;display:flex}.uSSQ4q_factRef{color:var(--dsw-alias-label-tertiary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}.uSSQ4q_warn{color:var(--dsw-alias-state-warn-label)}.uSSQ4q_error{color:var(--dsw-alias-state-error-primary)}.uSSQ4q_notice{background:var(--dsw-alias-state-warn-tertiary);border-radius:8px;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 10px;font-size:12px;line-height:18px;display:flex}.uSSQ4q_models{flex-direction:column;gap:6px;display:flex}.uSSQ4q_modelsHead{flex-wrap:wrap;align-items:center;gap:4px;display:flex}.uSSQ4q_modelsHead>button{white-space:nowrap;flex-shrink:0}.uSSQ4q_modelsLabel{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:500;line-height:18px}.uSSQ4q_grow{flex:1}.uSSQ4q_modelList{flex-direction:column;align-items:flex-start;gap:10px;width:100%;display:flex}.uSSQ4q_modelGroupLabel{color:var(--dsw-alias-label-tertiary);margin:0;padding:6px 0 2px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:16px}.uSSQ4q_modelGroupLabel:first-child{padding-top:0}.uSSQ4q_modelRows{background:var(--dsw-alias-bg-layer-1);border-radius:8px;flex-direction:column;width:100%;margin:0;padding:6px 10px;font-size:12px;line-height:20px;list-style:none;display:flex}.uSSQ4q_modelRow{align-items:baseline;gap:6px;min-width:0;padding:1px 0;display:flex}.uSSQ4q_modelName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.uSSQ4q_modelTag{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary);border-radius:4px;flex-shrink:0;align-self:center;padding:0 5px;font-size:10px;line-height:15px}.uSSQ4q_toolbar{align-items:center;gap:8px;display:flex}.uSSQ4q_toolbar>button{white-space:nowrap;flex-shrink:0}.uSSQ4q_catalogNotice{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);border-radius:8px;margin:0;padding:6px 10px;font-size:12px;line-height:18px}.uSSQ4q_discover{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:8px;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 10px;display:flex}.uSSQ4q_discoverInput{flex:1;min-width:220px}.uSSQ4q_discover .uSSQ4q_hint{flex-basis:100%}.uSSQ4q_actions{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.uSSQ4q_destructive{margin-left:auto}.uSSQ4q_checkboxRow{color:var(--dsw-alias-label-secondary);cursor:pointer;align-items:center;gap:6px;font-size:12px;display:flex}.uSSQ4q_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:18px}.uSSQ4q_field{flex-direction:column;gap:6px;min-width:0;display:flex}.uSSQ4q_fieldLabel{color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px}.uSSQ4q_fieldControl{min-width:0;display:flex;position:relative}.uSSQ4q_fieldInput{flex:1;min-width:0}.uSSQ4q_fieldInput input{padding-right:34px}.uSSQ4q_reveal{width:26px;height:26px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;padding:0;display:inline-flex;position:absolute;top:50%;right:6px;transform:translateY(-50%)}.uSSQ4q_reveal:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}.uSSQ4q_confirmBody{flex-direction:column;gap:6px;min-width:0;display:flex}.uSSQ4q_wizard{flex-direction:column;gap:12px;width:100%;min-width:0;max-width:100%;display:flex}.uSSQ4q_wizardUrl{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:8px;flex-direction:column;gap:8px;min-width:0;padding:12px;display:flex}.uSSQ4q_wizardUrlText{min-width:0;max-height:132px;color:var(--dsw-alias-label-tertiary);overflow-wrap:anywhere;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:16px;overflow-y:auto}.uSSQ4q_deviceCode{letter-spacing:2px;color:var(--dsw-alias-label-primary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:20px}.uSSQ4q_promptRow{align-items:center;gap:8px;min-width:0;display:flex}.uSSQ4q_promptInput{flex:auto;min-width:0}.uSSQ4q_promptSubmit{flex:none}.uSSQ4q_log{max-height:160px;color:var(--dsw-alias-label-tertiary);flex-direction:column;gap:2px;font-size:12px;line-height:18px;display:flex;overflow-y:auto}.uSSQ4q_optionList{flex-direction:column;gap:4px;display:flex}.uSSQ4q_option{border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border-radius:8px;flex-direction:column;gap:2px;padding:8px;font-size:13px;display:flex}.uSSQ4q_option:hover{background:var(--dsw-alias-interactive-bg-hover)}.uSSQ4q_optionDescription{color:var(--dsw-alias-label-tertiary);font-size:12px}";
const tagId = "dsh-providers/AccountsSection.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "dsh-providers";
	tag.dataset.pluginCss = tagId;
	tag.textContent = css;
	document.head.appendChild(tag);
}
var AccountsSection_module_css_default = {
	"wizard": "uSSQ4q_wizard",
	"fieldControl": "uSSQ4q_fieldControl",
	"list": "uSSQ4q_list",
	"wizardUrl": "uSSQ4q_wizardUrl",
	"chevron": "uSSQ4q_chevron",
	"checkboxRow": "uSSQ4q_checkboxRow",
	"row": "uSSQ4q_row",
	"rowSummary": "uSSQ4q_rowSummary",
	"group": "uSSQ4q_group",
	"search": "uSSQ4q_search",
	"modelsHead": "uSSQ4q_modelsHead",
	"error": "uSSQ4q_error",
	"darkOnly": "uSSQ4q_darkOnly",
	"deviceCode": "uSSQ4q_deviceCode",
	"badge": "uSSQ4q_badge",
	"glyph": "uSSQ4q_glyph",
	"warn": "uSSQ4q_warn",
	"models": "uSSQ4q_models",
	"option": "uSSQ4q_option",
	"card": "uSSQ4q_card",
	"notice": "uSSQ4q_notice",
	"discoverInput": "uSSQ4q_discoverInput",
	"promptInput": "uSSQ4q_promptInput",
	"hint": "uSSQ4q_hint",
	"wizardUrlText": "uSSQ4q_wizardUrlText",
	"intro": "uSSQ4q_intro",
	"modelName": "uSSQ4q_modelName",
	"grow": "uSSQ4q_grow",
	"monogram": "uSSQ4q_monogram",
	"chevronOpen": "uSSQ4q_chevronOpen",
	"confirmBody": "uSSQ4q_confirmBody",
	"catalogNotice": "uSSQ4q_catalogNotice",
	"destructive": "uSSQ4q_destructive",
	"log": "uSSQ4q_log",
	"groupLabel": "uSSQ4q_groupLabel",
	"modelsLabel": "uSSQ4q_modelsLabel",
	"meta": "uSSQ4q_meta",
	"discover": "uSSQ4q_discover",
	"rowOpen": "uSSQ4q_rowOpen",
	"optionList": "uSSQ4q_optionList",
	"modelTag": "uSSQ4q_modelTag",
	"section": "uSSQ4q_section",
	"fieldInput": "uSSQ4q_fieldInput",
	"reveal": "uSSQ4q_reveal",
	"actions": "uSSQ4q_actions",
	"lightOnly": "uSSQ4q_lightOnly",
	"toolbar": "uSSQ4q_toolbar",
	"rowName": "uSSQ4q_rowName",
	"modelRow": "uSSQ4q_modelRow",
	"promptSubmit": "uSSQ4q_promptSubmit",
	"field": "uSSQ4q_field",
	"factRef": "uSSQ4q_factRef",
	"modelGroupLabel": "uSSQ4q_modelGroupLabel",
	"modelList": "uSSQ4q_modelList",
	"promptRow": "uSSQ4q_promptRow",
	"fieldLabel": "uSSQ4q_fieldLabel",
	"modelRows": "uSSQ4q_modelRows",
	"rowStatus": "uSSQ4q_rowStatus",
	"optionDescription": "uSSQ4q_optionDescription"
};

//#endregion
//#region src/client/SecretField.tsx
/** The eye at 16px, struck through while the value is visible. */
function EyeIcon({ struck }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M1.5 8s2.4-4.2 6.5-4.2S14.5 8 14.5 8s-2.4 4.2-6.5 4.2S1.5 8 1.5 8Z",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
				cx: "8",
				cy: "8",
				r: "1.9",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}),
			struck && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "m2.6 2.6 10.8 10.8",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})
		]
	});
}
/** Render a labelled secret input with a reveal toggle. */
function SecretField({ value, placeholder, label, showLabel, hideLabel, autoFocus = false, onChange, onSubmit, onReveal }) {
	const [revealed, setRevealed] = (0, react.useState)(false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
		className: AccountsSection_module_css_default.field,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: AccountsSection_module_css_default.fieldLabel,
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
			className: AccountsSection_module_css_default.fieldControl,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Input, {
				className: AccountsSection_module_css_default.fieldInput,
				type: revealed ? "text" : "password",
				value,
				autoFocus,
				autoComplete: "off",
				spellCheck: false,
				...placeholder === void 0 ? {} : { placeholder },
				onChange: (event) => onChange(event.target.value),
				onKeyDown: (event) => {
					if (event.key === "Enter") onSubmit();
				}
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: AccountsSection_module_css_default.reveal,
				"aria-label": revealed ? hideLabel : showLabel,
				"aria-pressed": revealed,
				onClick: () => {
					setRevealed(!revealed);
					if (!revealed) onReveal?.();
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EyeIcon, { struck: revealed })
			})]
		})]
	});
}

//#endregion
//#region src/client/LoginDialog.tsx
/** Render the wizard for one login flow. */
function LoginDialog({ flow, providerName, t, onAnswer, onPeekKey, onClose }) {
	const [draft, setDraft] = (0, react.useState)(null);
	const [copied, setCopied] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
		if (!copied) return void 0;
		const timer = setTimeout(() => setCopied(false), 2e3);
		return () => clearTimeout(timer);
	}, [copied]);
	const requestId = flow.prompt?.requestId;
	const typed = requestId !== void 0 && draft?.requestId === requestId ? draft.value : void 0;
	const prefillable = flow.prompt?.kind === "secret" && requestId === flow.prefillPromptId;
	const value = typed ?? (prefillable ? flow.storedKey ?? "" : "");
	const edit = (next) => {
		if (requestId !== void 0) setDraft({
			requestId,
			value: next
		});
	};
	const submit = () => {
		if (flow.prompt === null || flow.answering) return;
		onAnswer(value);
	};
	const copyUrl = async () => {
		if (flow.authUrl === null) return;
		setCopied(await (0, __deepseek_ai_dsh_client_ui_primitives.writeClipboard)(flow.authUrl));
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Modal, {
		open: true,
		onClose,
		title: t("loginTitle", { provider: providerName }),
		closeLabel: t("close"),
		footer: flow.done || flow.error !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
			variant: "ghost",
			onClick: onClose,
			children: t("close")
		}) : void 0,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AccountsSection_module_css_default.wizard,
			children: [
				flow.authUrl !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.wizardUrl,
					children: [
						flow.instructions !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: flow.instructions }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AccountsSection_module_css_default.wizardUrlText,
							children: flow.authUrl
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: AccountsSection_module_css_default.actions,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								onClick: () => window.open(flow.authUrl ?? "", "_blank", "noopener,noreferrer"),
								children: t("openLink")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								onClick: () => void copyUrl(),
								children: copied ? t("copied") : t("copyLink")
							})]
						})
					]
				}),
				flow.deviceCode !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.wizardUrl,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("deviceCodeTitle") }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AccountsSection_module_css_default.deviceCode,
							children: flow.deviceCode.userCode
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							onClick: () => window.open(flow.deviceCode?.verificationUri ?? "", "_blank", "noopener,noreferrer"),
							children: t("deviceCodeUrl")
						})
					]
				}),
				flow.prompt !== null && flow.prompt.kind === "select" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.optionList,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: flow.prompt.message }), (flow.prompt.options ?? []).map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: AccountsSection_module_css_default.option,
						disabled: flow.answering,
						onClick: () => onAnswer(option.id),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: option.label }), option.description !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AccountsSection_module_css_default.optionDescription,
							children: option.description
						})]
					}, option.id))]
				}),
				flow.prompt !== null && flow.prompt.kind === "secret" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SecretField, {
					label: flow.prompt.message,
					value,
					placeholder: flow.prompt.placeholder ?? t("secretPlaceholder"),
					showLabel: t("revealSecret"),
					hideLabel: t("hideSecret"),
					autoFocus: true,
					onChange: edit,
					onSubmit: submit,
					onReveal: () => {
						if (typed === void 0) onPeekKey();
					}
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "primary",
					disabled: flow.answering || value.trim().length === 0,
					onClick: submit,
					children: t("submit")
				})] }),
				flow.prompt !== null && flow.prompt.kind !== "select" && flow.prompt.kind !== "secret" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
					className: AccountsSection_module_css_default.field,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AccountsSection_module_css_default.fieldLabel,
						children: flow.prompt.message
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AccountsSection_module_css_default.promptRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Input, {
							className: AccountsSection_module_css_default.promptInput,
							type: "text",
							value,
							autoFocus: true,
							autoComplete: "off",
							spellCheck: false,
							placeholder: flow.prompt.placeholder ?? "",
							onChange: (event) => edit(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Enter") submit();
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							className: AccountsSection_module_css_default.promptSubmit,
							disabled: flow.answering,
							onClick: submit,
							children: t("submit")
						})]
					})]
				}),
				flow.progress !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: flow.progress }),
				flow.prompt === null && !flow.done && flow.error === null && flow.progress === null && (flow.authUrl !== null || flow.deviceCode !== null) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("waiting") }),
				flow.done && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("done") }),
				flow.error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.error,
					children: `${t("loginFailed")}: ${flow.error}`
				}),
				flow.infos.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: AccountsSection_module_css_default.log,
					children: flow.infos.map((info) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [info.message, info.links.map((link) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
						href: link.url,
						target: "_blank",
						rel: "noopener noreferrer",
						children: ` ${link.label ?? link.url}`
					}, link.url))] }, info.id))
				})
			]
		})
	});
}

//#endregion
//#region src/client/LogoutDialog.tsx
/** Render the sign-out confirmation. */
function LogoutDialog({ providerName, routed, busy, t, onCancel, onConfirm }) {
	const [removeRoute, setRemoveRoute] = (0, react.useState)(false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Modal, {
		open: true,
		onClose: onCancel,
		title: t("logoutTitle", { provider: providerName }),
		closeLabel: t("close"),
		description: t("logoutDescription"),
		footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AccountsSection_module_css_default.actions,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
				variant: "ghost",
				onClick: onCancel,
				children: t("cancel")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
				variant: "primary",
				disabled: busy,
				onClick: () => onConfirm(removeRoute),
				children: busy ? t("signingOut") : t("logoutConfirm")
			})]
		}),
		children: routed && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AccountsSection_module_css_default.confirmBody,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: AccountsSection_module_css_default.checkboxRow,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: removeRoute,
					onChange: (event) => setRemoveRoute(event.target.checked)
				}), t("removeRoute")]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: AccountsSection_module_css_default.hint,
				children: t("removeRouteHint")
			})]
		})
	});
}

//#endregion
//#region src/client/ModelList.tsx
/**
* How many models a collapsed list shows. Enough that a small provider shows
* everything without an expander; short enough that a 400-model gateway does
* not bury the card's own controls.
*/
const PREVIEW = 8;
/** Whether a model accepts images. */
function vision(model) {
	return model.input?.includes("image") === true;
}
/** Render one provider's models as a grouped, expandable list. */
function ModelList({ models, expanded, t, onToggleExpand }) {
	if (models.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
		className: AccountsSection_module_css_default.hint,
		children: t("modelsEmpty")
	});
	const shown = expanded ? models : models.slice(0, PREVIEW);
	const hidden = models.length - shown.length;
	const groups = [];
	for (const model of shown) {
		const last = groups.at(-1);
		if (last?.route === model.route) last.models.push(model);
		else groups.push({
			route: model.route,
			...model.api === void 0 ? {} : { api: model.api },
			models: [model]
		});
	}
	const grouped = groups.length > 1;
	const tagged = shown.some(vision) && !shown.every(vision);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: AccountsSection_module_css_default.modelList,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
			className: AccountsSection_module_css_default.modelRows,
			children: groups.map((group) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.Fragment, { children: [grouped && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: AccountsSection_module_css_default.modelGroupLabel,
				children: [group.route, group.api !== void 0 && ` · ${group.api}`]
			}), group.models.map((model) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: AccountsSection_module_css_default.modelRow,
				title: model.id,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.modelName,
					children: model.name
				}), tagged && vision(model) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.modelTag,
					children: t("modalityImage")
				})]
			}, `${model.route}/${model.id}`))] }, group.route))
		}), (hidden > 0 || expanded) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
			variant: "ghost",
			size: "sm",
			onClick: onToggleExpand,
			children: expanded ? t("modelsCollapse") : t("modelsExpand", { count: hidden })
		})]
	});
}

//#endregion
//#region node_modules/.pnpm/es-toolkit@1.50.0/node_modules/es-toolkit/dist/string/words.mjs
/**
* Regular expression pattern to split strings into words for various case conversions
*
* This pattern matches sequences of characters in a string, considering the following cases:
* - Sequences of two or more uppercase letters followed by an uppercase letter and lowercase letters or digits (for acronyms)
* - Sequences of one uppercase letter optionally followed by lowercase letters and digits
* - Single uppercase letters
* - Sequences of digits
* - Emojis and other Unicode characters
*
* The resulting match can be used to convert camelCase, snake_case, kebab-case, and other mixed formats into
* a consistent format like snake case. It also supports emojis and other Unicode characters.
*
* @example
* const matches = 'camelCaseHTTPRequest🚀'.match(CASE_SPLIT_PATTERN);
* // matches: ['camel', 'Case', 'HTTP', 'Request', '🚀']
*/
const CASE_SPLIT_PATTERN = /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;
/**
* Splits `string` into an array of its words, treating spaces and punctuation marks as separators.
*
* @param str The string to inspect.
* @param [pattern] The pattern to match words.
* @returns Returns the words of `string`.
*
* @example
* words('fred, barney, & pebbles');
* // => ['fred', 'barney', 'pebbles']
*
* words('camelCaseHTTPRequest🚀');
* // => ['camel', 'Case', 'HTTP', 'Request', '🚀']
*
* words('Lunedì 18 Set')
* // => ['Lunedì', '18', 'Set']
*/
function words(str) {
	return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []);
}

//#endregion
//#region node_modules/.pnpm/es-toolkit@1.50.0/node_modules/es-toolkit/dist/string/kebabCase.mjs
/**
* Converts a string to kebab case.
*
* Kebab case is the naming convention in which each word is written in lowercase and separated by a dash (-) character.
*
* @param str - The string that is to be changed to kebab case.
* @returns The converted string to kebab case.
*
* @example
* const convertedStr1 = kebabCase('camelCase') // returns 'camel-case'
* const convertedStr2 = kebabCase('some whitespace') // returns 'some-whitespace'
* const convertedStr3 = kebabCase('hyphen-text') // returns 'hyphen-text'
* const convertedStr4 = kebabCase('HTTPRequest') // returns 'http-request'
*/
function kebabCase(str) {
	return words(str).map((word) => word.toLowerCase()).join("-");
}

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/hooks/useFillId.js
var useFillId = function useFillId$1(namespace) {
	var uniqueId = (0, react.useId)();
	var id = "lobe-icons-".concat(kebabCase(namespace), "-").concat(uniqueId);
	return (0, react.useMemo)(function() {
		return {
			fill: "url(#".concat(id, ")"),
			id
		};
	}, [namespace]);
};
var useFillIds = function useFillIds$1(namespace, length) {
	var uniqueId = (0, react.useId)();
	return (0, react.useMemo)(function() {
		return Array.from({ length }, function(_, i) {
			var id = "lobe-icons-".concat(kebabCase(namespace), "-").concat(i, "-").concat(uniqueId);
			return {
				fill: "url(#".concat(id, ")"),
				id
			};
		});
	}, [
		namespace,
		length,
		uniqueId
	]);
};

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/AntGroup/style.js
var TITLE$28 = "AntGroup";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/AntGroup/components/Color.js
function _typeof$29(o) {
	"@babel/helpers - typeof";
	return _typeof$29 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$29(o);
}
var _excluded$29 = ["size", "style"];
function ownKeys$29(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$29(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$29(Object(t), !0).forEach(function(r$1) {
			_defineProperty$29(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$29(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$29(obj, key, value) {
	key = _toPropertyKey$29(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$29(t) {
	var i = _toPrimitive$29(t, "string");
	return "symbol" == _typeof$29(i) ? i : String(i);
}
function _toPrimitive$29(t, r) {
	if ("object" != _typeof$29(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$29(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _slicedToArray$1(arr, i) {
	return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$1(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = !0, n = r$1;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$1(arr) {
	if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties$29(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$29(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$29(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$29 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$29(_ref, _excluded$29);
	var _useFillIds2 = _slicedToArray$1(useFillIds(TITLE$28, 3), 3), a = _useFillIds2[0], b = _useFillIds2[1], c = _useFillIds2[2];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$29(_objectSpread$29({
		height: size,
		style: _objectSpread$29({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$28 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M9.797 6.282a.451.451 0 01-.336-.315 1.019 1.019 0 010-.505c.156-.86.3-1.725.501-2.577.14-.7.42-1.367.823-1.96.305-.431.75-.746 1.262-.89.877-.217 1.24.629.937 1.348-.259.593-.877.914-1.334 1.348-.835.795-1.096 2.14-1.336 3.212a.427.427 0 01-.186.277.437.437 0 01-.331.062z",
			fill: a.fill,
			transform: "translate(3)"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M6.334 4.672c.33-.121.682.146.946.297.278.145.587.219.901.214.231.01.466 0 .688.018 4.098.176 7.484 3.22 8.05 7.237.565 4.016-1.852 7.859-5.745 9.134-3.894 1.276-8.153-.38-10.126-3.935A8.339 8.339 0 013.133 7.081c.348-.278.716-.53 1.102-.755a8.404 8.404 0 001.318-.79c.28-.243.45-.742.781-.864zm4.406 2.15c-2.841.003-4.898 2.533-4.628 5.642.27 3.109 2.781 5.641 5.613 5.665 2.832.024 4.932-2.512 4.658-5.644-.273-3.133-2.802-5.666-5.643-5.663zm.357.57a4.707 4.707 0 013.304 1.446 5.703 5.703 0 011.643 3.49 4.841 4.841 0 01-1.141 3.705v.015a3.923 3.923 0 01-2.808 1.303 4.664 4.664 0 01-3.367-1.387 5.678 5.678 0 01-1.71-3.518 4.832 4.832 0 011.14-3.753 3.923 3.923 0 012.813-1.3h.126z",
			fill: b.fill,
			transform: "translate(3)"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2.346 2.054a1.26 1.26 0 01.384-.594.842.842 0 011.165.11c.694.82.169 2.078.142 3.02.013.805.208 1.597.57 2.318.084.134.147.279.186.43a.539.539 0 01-.3.577c-.345.17-.568-.19-.709-.446-.324-.6-.617-1.216-.877-1.846a8.698 8.698 0 01-.618-1.987 7.523 7.523 0 01-.051-.37 3.717 3.717 0 01-.024-.34 2.506 2.506 0 01.132-.872z",
			fill: c.fill,
			transform: "translate(3)"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				id: a.id,
				x1: "31.373%",
				x2: "61.365%",
				y1: "95.551%",
				y2: "-.348%",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#06F"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "20%",
						stopColor: "#1677FF"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#04A6FF"
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				id: b.id,
				x1: "4.366%",
				x2: "94.359%",
				y1: "65.982%",
				y2: "32.918%",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#06F"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "20%",
						stopColor: "#1677FF"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#04A6FF"
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				id: c.id,
				x1: "56.255%",
				x2: "45.986%",
				y1: "99.257%",
				y2: "1.384%",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#06F"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "20%",
						stopColor: "#1677FF"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#04A6FF"
					})
				]
			})
		] })
	] }));
});
var Color_default = Icon$29;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Claude/style.js
var TITLE$27 = "Claude";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Claude/components/Color.js
function _typeof$28(o) {
	"@babel/helpers - typeof";
	return _typeof$28 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$28(o);
}
var _excluded$28 = ["size", "style"];
function ownKeys$28(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$28(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$28(Object(t), !0).forEach(function(r$1) {
			_defineProperty$28(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$28(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$28(obj, key, value) {
	key = _toPropertyKey$28(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$28(t) {
	var i = _toPrimitive$28(t, "string");
	return "symbol" == _typeof$28(i) ? i : String(i);
}
function _toPrimitive$28(t, r) {
	if ("object" != _typeof$28(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$28(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$28(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$28(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$28(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$28 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$28(_ref, _excluded$28);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$28(_objectSpread$28({
		height: size,
		style: _objectSpread$28({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$27 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z",
		fill: "#D97757",
		fillRule: "nonzero"
	})] }));
});
var Color_default$1 = Icon$28;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Azure/style.js
var TITLE$26 = "Azure";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Azure/components/Color.js
function _typeof$27(o) {
	"@babel/helpers - typeof";
	return _typeof$27 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$27(o);
}
var _excluded$27 = ["size", "style"];
function ownKeys$27(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$27(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$27(Object(t), !0).forEach(function(r$1) {
			_defineProperty$27(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$27(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$27(obj, key, value) {
	key = _toPropertyKey$27(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$27(t) {
	var i = _toPrimitive$27(t, "string");
	return "symbol" == _typeof$27(i) ? i : String(i);
}
function _toPrimitive$27(t, r) {
	if ("object" != _typeof$27(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$27(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _slicedToArray(arr, i) {
	return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = !0, n = r$1;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles(arr) {
	if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties$27(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$27(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$27(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$27 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$27(_ref, _excluded$27);
	var _useFillIds2 = _slicedToArray(useFillIds(TITLE$26, 3), 3), a = _useFillIds2[0], b = _useFillIds2[1], c = _useFillIds2[2];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$27(_objectSpread$27({
		height: size,
		style: _objectSpread$27({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$26 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M7.242 1.613A1.11 1.11 0 018.295.857h6.977L8.03 22.316a1.11 1.11 0 01-1.052.755h-5.43a1.11 1.11 0 01-1.053-1.466L7.242 1.613z",
			fill: a.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M18.397 15.296H7.4a.51.51 0 00-.347.882l7.066 6.595c.206.192.477.298.758.298h6.226l-2.706-7.775z",
			fill: "#0078D4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M15.272.857H7.497L0 23.071h7.775l1.596-4.73 5.068 4.73h6.665l-2.707-7.775h-7.998L15.272.857z",
			fill: b.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M17.193 1.613a1.11 1.11 0 00-1.052-.756h-7.81.035c.477 0 .9.304 1.052.756l6.748 19.992a1.11 1.11 0 01-1.052 1.466h-.12 7.895a1.11 1.11 0 001.052-1.466L17.193 1.613z",
			fill: c.fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: a.id,
				x1: "8.247",
				x2: "1.002",
				y1: "1.626",
				y2: "23.03",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#114A8B" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#0669BC"
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: b.id,
				x1: "14.042",
				x2: "12.324",
				y1: "15.302",
				y2: "15.888",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopOpacity: ".3" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: ".071",
						stopOpacity: ".2"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: ".321",
						stopOpacity: ".1"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: ".623",
						stopOpacity: ".05"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopOpacity: "0"
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: c.id,
				x1: "12.841",
				x2: "20.793",
				y1: "1.626",
				y2: "22.814",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#3CCBF4" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#2892DF"
				})]
			})
		] })
	] }));
});
var Color_default$2 = Icon$27;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Baseten/style.js
var TITLE$25 = "Baseten";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Baseten/components/Mono.js
function _typeof$26(o) {
	"@babel/helpers - typeof";
	return _typeof$26 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$26(o);
}
var _excluded$26 = ["size", "style"];
function ownKeys$26(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$26(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$26(Object(t), !0).forEach(function(r$1) {
			_defineProperty$26(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$26(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$26(obj, key, value) {
	key = _toPropertyKey$26(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$26(t) {
	var i = _toPrimitive$26(t, "string");
	return "symbol" == _typeof$26(i) ? i : String(i);
}
function _toPrimitive$26(t, r) {
	if ("object" != _typeof$26(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$26(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$26(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$26(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$26(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$26 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$26(_ref, _excluded$26);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$26(_objectSpread$26({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$26({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$25 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2.316 4.8h14.682v4.8H7.31a.302.302 0 00-.308.3v4.2c0 .171.14.3.308.3h9.688v4.8h-4.686a.302.302 0 00-.308.3v4.2c0 .171.141.3.308.3h4.378a.297.297 0 00.308-.3v-4.5h4.694a.302.302 0 00.308-.3v-4.2c0-.171-.14-.3-.308-.3h-4.694V9.6h4.694A.302.302 0 0022 9.3V5.1c0-.171-.14-.3-.308-.3h-4.694V.3c0-.171-.14-.3-.308-.3H2.316A.31.31 0 002 .3v4.2c0 .171.14.3.316.3z" })] }));
});
var Mono_default = Icon$26;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Bedrock/style.js
var TITLE$24 = "Bedrock";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Bedrock/components/Color.js
function _typeof$25(o) {
	"@babel/helpers - typeof";
	return _typeof$25 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$25(o);
}
var _excluded$25 = ["size", "style"];
function ownKeys$25(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$25(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$25(Object(t), !0).forEach(function(r$1) {
			_defineProperty$25(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$25(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$25(obj, key, value) {
	key = _toPropertyKey$25(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$25(t) {
	var i = _toPrimitive$25(t, "string");
	return "symbol" == _typeof$25(i) ? i : String(i);
}
function _toPrimitive$25(t, r) {
	if ("object" != _typeof$25(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$25(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$25(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$25(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$25(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$25 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$25(_ref, _excluded$25);
	var _useFillId = useFillId(TITLE$24), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$25(_objectSpread$25({
		height: size,
		style: _objectSpread$25({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$24 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			id,
			x1: "80%",
			x2: "20%",
			y1: "20%",
			y2: "80%",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#6350FB"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "50%",
					stopColor: "#3D8FFF"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#9AD8F8"
				})
			]
		}) }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M13.05 15.513h3.08c.214 0 .389.177.389.394v1.82a1.704 1.704 0 011.296 1.661c0 .943-.755 1.708-1.685 1.708-.931 0-1.686-.765-1.686-1.708 0-.807.554-1.484 1.297-1.662v-1.425h-2.69v4.663a.395.395 0 01-.188.338l-2.69 1.641a.385.385 0 01-.405-.002l-4.926-3.086a.395.395 0 01-.185-.336V16.3L2.196 14.87A.395.395 0 012 14.555L2 14.528V9.406c0-.14.073-.27.192-.34l2.465-1.462V4.448c0-.129.062-.249.165-.322l.021-.014L9.77 1.058a.385.385 0 01.407 0l2.69 1.675a.395.395 0 01.185.336V7.6h3.856V5.683a1.704 1.704 0 01-1.296-1.662c0-.943.755-1.708 1.685-1.708.931 0 1.685.765 1.685 1.708 0 .807-.553 1.484-1.296 1.662v2.311a.391.391 0 01-.389.394h-4.245v1.806h6.624a1.69 1.69 0 011.64-1.313c.93 0 1.685.764 1.685 1.707 0 .943-.754 1.708-1.685 1.708a1.69 1.69 0 01-1.64-1.314H13.05v1.937h4.953l.915 1.18a1.66 1.66 0 01.84-.227c.931 0 1.685.764 1.685 1.707 0 .943-.754 1.708-1.685 1.708-.93 0-1.685-.765-1.685-1.708 0-.346.102-.668.276-.937l-.724-.935H13.05v1.806zM9.973 1.856L7.93 3.122V6.09h-.778V3.604L5.435 4.669v2.945l2.11 1.36L9.712 7.61V5.334h.778V7.83c0 .136-.07.263-.184.335L7.963 9.638v2.081l1.422 1.009-.446.646-1.406-.998-1.53 1.005-.423-.66 1.605-1.055v-1.99L5.038 8.29l-2.26 1.34v1.676l1.972-1.189.398.677-2.37 1.429V14.3l2.166 1.258 2.27-1.368.397.677-2.176 1.311V19.3l1.876 1.175 2.365-1.426.398.678-2.017 1.216 1.918 1.201 2.298-1.403v-5.78l-4.758 2.893-.4-.675 5.158-3.136V3.289L9.972 1.856zM16.13 18.47a.913.913 0 00-.908.92c0 .507.406.918.908.918a.913.913 0 00.907-.919.913.913 0 00-.907-.92zm3.63-3.81a.913.913 0 00-.908.92c0 .508.406.92.907.92a.913.913 0 00.908-.92.913.913 0 00-.908-.92zm1.555-4.99a.913.913 0 00-.908.92c0 .507.407.918.908.918a.913.913 0 00.907-.919.913.913 0 00-.907-.92zM17.296 3.1a.913.913 0 00-.907.92c0 .508.406.92.907.92a.913.913 0 00.908-.92.913.913 0 00-.908-.92z",
			fill,
			fillRule: "nonzero"
		})
	] }));
});
var Color_default$3 = Icon$25;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cerebras/style.js
var TITLE$23 = "Cerebras";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cerebras/components/Color.js
function _typeof$24(o) {
	"@babel/helpers - typeof";
	return _typeof$24 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$24(o);
}
var _excluded$24 = ["size", "style"];
function ownKeys$24(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$24(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$24(Object(t), !0).forEach(function(r$1) {
			_defineProperty$24(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$24(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$24(obj, key, value) {
	key = _toPropertyKey$24(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$24(t) {
	var i = _toPrimitive$24(t, "string");
	return "symbol" == _typeof$24(i) ? i : String(i);
}
function _toPrimitive$24(t, r) {
	if ("object" != _typeof$24(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$24(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$24(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$24(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$24(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$24 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$24(_ref, _excluded$24);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$24(_objectSpread$24({
		fill: "currentColor",
		height: size,
		style: _objectSpread$24({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$23 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M14.121 2.701a9.299 9.299 0 000 18.598V22.7c-5.91 0-10.7-4.791-10.7-10.701S8.21 1.299 14.12 1.299V2.7zm4.752 3.677A7.353 7.353 0 109.42 17.643l-.901 1.074a8.754 8.754 0 01-1.08-12.334 8.755 8.755 0 0112.335-1.08l-.901 1.075zm-2.255.844a5.407 5.407 0 00-5.048 9.563l-.656 1.24a6.81 6.81 0 016.358-12.043l-.654 1.24zM14.12 8.539a3.46 3.46 0 100 6.922v1.402a4.863 4.863 0 010-9.726v1.402z",
			fill: "#F15A29",
			fillRule: "evenodd"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M15.407 10.836a2.24 2.24 0 00-.51-.409 1.084 1.084 0 00-.544-.152c-.255 0-.483.047-.684.14a1.58 1.58 0 00-.84.912c-.074.203-.11.416-.11.631 0 .218.036.43.11.631a1.594 1.594 0 00.84.913c.2.093.43.14.684.14.216 0 .417-.046.602-.135.188-.09.35-.225.475-.392l.928 1.006c-.14.14-.3.261-.482.363a3.367 3.367 0 01-1.083.38c-.17.026-.317.04-.44.04a3.315 3.315 0 01-1.182-.21 2.825 2.825 0 01-.961-.597 2.816 2.816 0 01-.644-.929 2.987 2.987 0 01-.238-1.21c0-.444.08-.847.238-1.21.15-.35.368-.666.643-.929.278-.261.605-.464.962-.596a3.315 3.315 0 011.182-.21c.355 0 .712.068 1.072.204.361.138.685.36.944.649l-.962.97z" })
	] }));
});
var Color_default$4 = Icon$24;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cloudflare/style.js
var TITLE$22 = "Cloudflare";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Cloudflare/components/Color.js
function _typeof$23(o) {
	"@babel/helpers - typeof";
	return _typeof$23 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$23(o);
}
var _excluded$23 = ["size", "style"];
function ownKeys$23(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$23(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$23(Object(t), !0).forEach(function(r$1) {
			_defineProperty$23(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$23(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$23(obj, key, value) {
	key = _toPropertyKey$23(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$23(t) {
	var i = _toPrimitive$23(t, "string");
	return "symbol" == _typeof$23(i) ? i : String(i);
}
function _toPrimitive$23(t, r) {
	if ("object" != _typeof$23(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$23(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$23(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$23(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$23(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$23 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$23(_ref, _excluded$23);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$23(_objectSpread$23({
		height: size,
		style: _objectSpread$23({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$22 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M16.493 17.4c.135-.52.08-.983-.161-1.338-.215-.328-.592-.519-1.05-.519l-8.663-.109a.148.148 0 01-.135-.082c-.027-.054-.027-.109-.027-.163.027-.082.108-.164.189-.164l8.744-.11c1.05-.054 2.153-.9 2.556-1.937l.511-1.31c.027-.055.027-.11.027-.164C17.92 8.91 15.66 7 12.942 7c-2.503 0-4.628 1.638-5.381 3.903a2.432 2.432 0 00-1.803-.491c-1.21.109-2.153 1.092-2.287 2.32-.027.328 0 .628.054.9C1.56 13.688 0 15.326 0 17.319c0 .19.027.355.027.545 0 .082.08.137.161.137h15.983c.08 0 .188-.055.215-.164l.107-.437",
			fill: "#F38020"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M19.238 11.75h-.242c-.054 0-.108.054-.135.109l-.35 1.2c-.134.52-.08.983.162 1.338.215.328.592.518 1.05.518l1.855.11c.054 0 .108.027.135.082.027.054.027.109.027.163-.027.082-.108.164-.188.164l-1.91.11c-1.05.054-2.153.9-2.557 1.937l-.134.355c-.027.055.026.137.107.137h6.592c.081 0 .162-.055.162-.137.107-.41.188-.846.188-1.31-.027-2.62-2.153-4.777-4.762-4.777",
			fill: "#FCAD32"
		})
	] }));
});
var Color_default$5 = Icon$23;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Codex/style.js
var TITLE$21 = "Codex";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Codex/components/Color.js
function _typeof$22(o) {
	"@babel/helpers - typeof";
	return _typeof$22 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$22(o);
}
var _excluded$22 = ["size", "style"];
function ownKeys$22(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$22(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$22(Object(t), !0).forEach(function(r$1) {
			_defineProperty$22(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$22(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$22(obj, key, value) {
	key = _toPropertyKey$22(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$22(t) {
	var i = _toPrimitive$22(t, "string");
	return "symbol" == _typeof$22(i) ? i : String(i);
}
function _toPrimitive$22(t, r) {
	if ("object" != _typeof$22(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$22(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$22(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$22(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$22(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$22 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$22(_ref, _excluded$22);
	var _useFillId = useFillId(TITLE$21), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$22(_objectSpread$22({
		height: size,
		style: _objectSpread$22({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$21 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M19.503 0H4.496A4.496 4.496 0 000 4.496v15.007A4.496 4.496 0 004.496 24h15.007A4.496 4.496 0 0024 19.503V4.496A4.496 4.496 0 0019.503 0z",
			fill: "#fff"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M9.064 3.344a4.578 4.578 0 012.285-.312c1 .115 1.891.54 2.673 1.275.01.01.024.017.037.021a.09.09 0 00.043 0 4.55 4.55 0 013.046.275l.047.022.116.057a4.581 4.581 0 012.188 2.399c.209.51.313 1.041.315 1.595a4.24 4.24 0 01-.134 1.223.123.123 0 00.03.115c.594.607.988 1.33 1.183 2.17.289 1.425-.007 2.71-.887 3.854l-.136.166a4.548 4.548 0 01-2.201 1.388.123.123 0 00-.081.076c-.191.551-.383 1.023-.74 1.494-.9 1.187-2.222 1.846-3.711 1.838-1.187-.006-2.239-.44-3.157-1.302a.107.107 0 00-.105-.024c-.388.125-.78.143-1.204.138a4.441 4.441 0 01-1.945-.466 4.544 4.544 0 01-1.61-1.335c-.152-.202-.303-.392-.414-.617a5.81 5.81 0 01-.37-.961 4.582 4.582 0 01-.014-2.298.124.124 0 00.006-.056.085.085 0 00-.027-.048 4.467 4.467 0 01-1.034-1.651 3.896 3.896 0 01-.251-1.192 5.189 5.189 0 01.141-1.6c.337-1.112.982-1.985 1.933-2.618.212-.141.413-.251.601-.33.215-.089.43-.164.646-.227a.098.098 0 00.065-.066 4.51 4.51 0 01.829-1.615 4.535 4.535 0 011.837-1.388zm3.482 10.565a.637.637 0 000 1.272h3.636a.637.637 0 100-1.272h-3.636zM8.462 9.23a.637.637 0 00-1.106.631l1.272 2.224-1.266 2.136a.636.636 0 101.095.649l1.454-2.455a.636.636 0 00.005-.64L8.462 9.23z",
			fill
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			gradientUnits: "userSpaceOnUse",
			id,
			x1: "12",
			x2: "12",
			y1: "3",
			y2: "21",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", { stopColor: "#B1A7FF" }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: ".5",
					stopColor: "#7A9DFF"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#3941FF"
				})
			]
		}) })
	] }));
});
var Color_default$6 = Icon$22;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/DeepSeek/style.js
var TITLE$20 = "DeepSeek";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/DeepSeek/components/Color.js
function _typeof$21(o) {
	"@babel/helpers - typeof";
	return _typeof$21 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$21(o);
}
var _excluded$21 = ["size", "style"];
function ownKeys$21(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$21(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$21(Object(t), !0).forEach(function(r$1) {
			_defineProperty$21(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$21(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$21(obj, key, value) {
	key = _toPropertyKey$21(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$21(t) {
	var i = _toPrimitive$21(t, "string");
	return "symbol" == _typeof$21(i) ? i : String(i);
}
function _toPrimitive$21(t, r) {
	if ("object" != _typeof$21(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$21(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$21(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$21(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$21(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$21 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$21(_ref, _excluded$21);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$21(_objectSpread$21({
		height: size,
		style: _objectSpread$21({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$20 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z",
		fill: "#4D6BFE"
	})] }));
});
var Color_default$7 = Icon$21;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Fireworks/style.js
var TITLE$19 = "Fireworks";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Fireworks/components/Color.js
function _typeof$20(o) {
	"@babel/helpers - typeof";
	return _typeof$20 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$20(o);
}
var _excluded$20 = ["size", "style"];
function ownKeys$20(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$20(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$20(Object(t), !0).forEach(function(r$1) {
			_defineProperty$20(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$20(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$20(obj, key, value) {
	key = _toPropertyKey$20(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$20(t) {
	var i = _toPrimitive$20(t, "string");
	return "symbol" == _typeof$20(i) ? i : String(i);
}
function _toPrimitive$20(t, r) {
	if ("object" != _typeof$20(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$20(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$20(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$20(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$20(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$20 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$20(_ref, _excluded$20);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$20(_objectSpread$20({
		height: size,
		style: _objectSpread$20({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$19 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M14.8 5l-2.801 6.795L9.195 5H7.397l3.072 7.428a1.64 1.64 0 003.038.002L16.598 5H14.8zm1.196 10.352l5.124-5.244-.699-1.669-5.596 5.739a1.664 1.664 0 00-.343 1.807 1.642 1.642 0 001.516 1.012L16 17l8-.02-.699-1.669-7.303.041h-.002zM2.88 10.104l.699-1.669 5.596 5.739c.468.479.603 1.189.343 1.807a1.643 1.643 0 01-1.516 1.012l-8-.018-.002.002.699-1.669 7.303.042-5.122-5.246z",
		fill: "#5019C5",
		fillRule: "evenodd"
	})] }));
});
var Color_default$8 = Icon$20;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/GithubCopilot/style.js
var TITLE$18 = "GithubCopilot";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/GithubCopilot/components/Mono.js
function _typeof$19(o) {
	"@babel/helpers - typeof";
	return _typeof$19 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$19(o);
}
var _excluded$19 = ["size", "style"];
function ownKeys$19(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$19(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$19(Object(t), !0).forEach(function(r$1) {
			_defineProperty$19(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$19(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$19(obj, key, value) {
	key = _toPropertyKey$19(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$19(t) {
	var i = _toPrimitive$19(t, "string");
	return "symbol" == _typeof$19(i) ? i : String(i);
}
function _toPrimitive$19(t, r) {
	if ("object" != _typeof$19(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$19(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$19(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$19(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$19(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$19 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$19(_ref, _excluded$19);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$19(_objectSpread$19({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$19({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$18 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M19.245 5.364c1.322 1.36 1.877 3.216 2.11 5.817.622 0 1.2.135 1.592.654l.73.964c.21.278.323.61.323.955v2.62c0 .339-.173.669-.453.868C20.239 19.602 16.157 21.5 12 21.5c-4.6 0-9.205-2.583-11.547-4.258-.28-.2-.452-.53-.453-.868v-2.62c0-.345.113-.679.321-.956l.73-.963c.392-.517.974-.654 1.593-.654l.029-.297c.25-2.446.81-4.213 2.082-5.52 2.461-2.54 5.71-2.851 7.146-2.864h.198c1.436.013 4.685.323 7.146 2.864zm-7.244 4.328c-.284 0-.613.016-.962.05-.123.447-.305.85-.57 1.108-1.05 1.023-2.316 1.18-2.994 1.18-.638 0-1.306-.13-1.851-.464-.516.165-1.012.403-1.044.996a65.882 65.882 0 00-.063 2.884l-.002.48c-.002.563-.005 1.126-.013 1.69.002.326.204.63.51.765 2.482 1.102 4.83 1.657 6.99 1.657 2.156 0 4.504-.555 6.985-1.657a.854.854 0 00.51-.766c.03-1.682.006-3.372-.076-5.053-.031-.596-.528-.83-1.046-.996-.546.333-1.212.464-1.85.464-.677 0-1.942-.157-2.993-1.18-.266-.258-.447-.661-.57-1.108-.32-.032-.64-.049-.96-.05zm-2.525 4.013c.539 0 .976.426.976.95v1.753c0 .525-.437.95-.976.95a.964.964 0 01-.976-.95v-1.752c0-.525.437-.951.976-.951zm5 0c.539 0 .976.426.976.95v1.753c0 .525-.437.95-.976.95a.964.964 0 01-.976-.95v-1.752c0-.525.437-.951.976-.951zM7.635 5.087c-1.05.102-1.935.438-2.385.906-.975 1.037-.765 3.668-.21 4.224.405.394 1.17.657 1.995.657h.09c.649-.013 1.785-.176 2.73-1.11.435-.41.705-1.433.675-2.47-.03-.834-.27-1.52-.63-1.813-.39-.336-1.275-.482-2.265-.394zm6.465.394c-.36.292-.6.98-.63 1.813-.03 1.037.24 2.06.675 2.47.968.957 2.136 1.104 2.776 1.11h.044c.825 0 1.59-.263 1.995-.657.555-.556.765-3.187-.21-4.224-.45-.468-1.335-.804-2.385-.906-.99-.088-1.875.058-2.265.394zM12 7.615c-.24 0-.525.015-.84.044.03.16.045.336.06.526l-.001.159a2.94 2.94 0 01-.014.25c.225-.022.425-.027.612-.028h.366c.187 0 .387.006.612.028-.015-.146-.015-.277-.015-.409.015-.19.03-.365.06-.526a9.29 9.29 0 00-.84-.044z" })] }));
});
var Mono_default$1 = Icon$19;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Google/style.js
var TITLE$17 = "Google";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Google/components/Color.js
function _typeof$18(o) {
	"@babel/helpers - typeof";
	return _typeof$18 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$18(o);
}
var _excluded$18 = ["size", "style"];
function ownKeys$18(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$18(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$18(Object(t), !0).forEach(function(r$1) {
			_defineProperty$18(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$18(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$18(obj, key, value) {
	key = _toPropertyKey$18(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$18(t) {
	var i = _toPrimitive$18(t, "string");
	return "symbol" == _typeof$18(i) ? i : String(i);
}
function _toPrimitive$18(t, r) {
	if ("object" != _typeof$18(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$18(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$18(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$18(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$18(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$18 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$18(_ref, _excluded$18);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$18(_objectSpread$18({
		height: size,
		style: _objectSpread$18({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$17 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M23 12.245c0-.905-.075-1.565-.236-2.25h-10.54v4.083h6.186c-.124 1.014-.797 2.542-2.294 3.569l-.021.136 3.332 2.53.23.022C21.779 18.417 23 15.593 23 12.245z",
			fill: "#4285F4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12.225 23c3.03 0 5.574-.978 7.433-2.665l-3.542-2.688c-.948.648-2.22 1.1-3.891 1.1a6.745 6.745 0 01-6.386-4.572l-.132.011-3.465 2.628-.045.124C4.043 20.531 7.835 23 12.225 23z",
			fill: "#34A853"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M5.84 14.175A6.65 6.65 0 015.463 12c0-.758.138-1.491.361-2.175l-.006-.147-3.508-2.67-.115.054A10.831 10.831 0 001 12c0 1.772.436 3.447 1.197 4.938l3.642-2.763z",
			fill: "#FBBC05"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12.225 5.253c2.108 0 3.529.892 4.34 1.638l3.167-3.031C17.787 2.088 15.255 1 12.225 1 7.834 1 4.043 3.469 2.197 7.062l3.63 2.763a6.77 6.77 0 016.398-4.572z",
			fill: "#EB4335"
		})
	] }));
});
var Color_default$9 = Icon$18;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Groq/style.js
var TITLE$16 = "Groq";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Groq/components/Mono.js
function _typeof$17(o) {
	"@babel/helpers - typeof";
	return _typeof$17 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$17(o);
}
var _excluded$17 = ["size", "style"];
function ownKeys$17(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$17(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$17(Object(t), !0).forEach(function(r$1) {
			_defineProperty$17(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$17(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$17(obj, key, value) {
	key = _toPropertyKey$17(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$17(t) {
	var i = _toPrimitive$17(t, "string");
	return "symbol" == _typeof$17(i) ? i : String(i);
}
function _toPrimitive$17(t, r) {
	if ("object" != _typeof$17(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$17(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$17(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$17(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$17(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$17 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$17(_ref, _excluded$17);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$17(_objectSpread$17({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$17({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12.036 2c-3.853-.035-7 3-7.036 6.781-.035 3.782 3.055 6.872 6.908 6.907h2.42v-2.566h-2.292c-2.407.028-4.38-1.866-4.408-4.23-.029-2.362 1.901-4.298 4.308-4.326h.1c2.407 0 4.358 1.915 4.365 4.278v6.305c0 2.342-1.944 4.25-4.323 4.279a4.375 4.375 0 01-3.033-1.252l-1.851 1.818A7 7 0 0012.029 22h.092c3.803-.056 6.858-3.083 6.879-6.816v-6.5C18.907 4.963 15.817 2 12.036 2z" })] }));
});
var Mono_default$2 = Icon$17;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/HuggingFace/style.js
var TITLE$15 = "HuggingFace";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/HuggingFace/components/Color.js
function _typeof$16(o) {
	"@babel/helpers - typeof";
	return _typeof$16 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$16(o);
}
var _excluded$16 = ["size", "style"];
function ownKeys$16(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$16(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$16(Object(t), !0).forEach(function(r$1) {
			_defineProperty$16(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$16(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$16(obj, key, value) {
	key = _toPropertyKey$16(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$16(t) {
	var i = _toPrimitive$16(t, "string");
	return "symbol" == _typeof$16(i) ? i : String(i);
}
function _toPrimitive$16(t, r) {
	if ("object" != _typeof$16(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$16(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$16(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$16(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$16(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$16 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$16(_ref, _excluded$16);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$16(_objectSpread$16({
		height: size,
		style: _objectSpread$16({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$15 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M2.25 11.535c0-3.407 1.847-6.554 4.844-8.258a9.822 9.822 0 019.687 0c2.997 1.704 4.844 4.851 4.844 8.258 0 5.266-4.337 9.535-9.687 9.535S2.25 16.8 2.25 11.535z",
			fill: "#FF9D0B"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.938 20.086c4.797 0 8.687-3.829 8.687-8.551 0-4.722-3.89-8.55-8.687-8.55-4.798 0-8.688 3.828-8.688 8.55 0 4.722 3.89 8.55 8.688 8.55z",
			fill: "#FFD21E"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.875 15.113c2.457 0 3.25-2.156 3.25-3.263 0-.576-.393-.394-1.023-.089-.582.283-1.365.675-2.224.675-1.798 0-3.25-1.693-3.25-.586 0 1.107.79 3.263 3.25 3.263h-.003z",
			fill: "#FF323D"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M14.76 9.21c.32.108.445.753.767.585.447-.233.707-.708.659-1.204a1.235 1.235 0 00-.879-1.059 1.262 1.262 0 00-1.33.394c-.322.384-.377.92-.14 1.36.153.283.638-.177.925-.079l-.002.003zm-5.887 0c-.32.108-.448.753-.768.585a1.226 1.226 0 01-.658-1.204c.048-.495.395-.913.878-1.059a1.262 1.262 0 011.33.394c.322.384.377.92.14 1.36-.152.283-.64-.177-.925-.079l.003.003zm1.12 5.34a2.166 2.166 0 011.325-1.106c.07-.02.144.06.219.171l.192.306c.069.1.139.175.209.175.074 0 .15-.074.223-.172l.205-.302c.08-.11.157-.188.234-.165.537.168.986.536 1.25 1.026.932-.724 1.275-1.905 1.275-2.633 0-.508-.306-.426-.81-.19l-.616.296c-.52.24-1.148.48-1.824.48-.676 0-1.302-.24-1.823-.48l-.589-.283c-.52-.248-.838-.342-.838.177 0 .703.32 1.831 1.187 2.56l.18.14z",
			fill: "#3A3B45"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M17.812 10.366a.806.806 0 00.813-.8c0-.441-.364-.8-.813-.8a.806.806 0 00-.812.8c0 .442.364.8.812.8zm-11.624 0a.806.806 0 00.812-.8c0-.441-.364-.8-.812-.8a.806.806 0 00-.813.8c0 .442.364.8.813.8zM4.515 13.073c-.405 0-.765.162-1.017.46a1.455 1.455 0 00-.333.925 1.801 1.801 0 00-.485-.074c-.387 0-.737.146-.985.409a1.41 1.41 0 00-.2 1.722 1.302 1.302 0 00-.447.694c-.06.222-.12.69.2 1.166a1.267 1.267 0 00-.093 1.236c.238.533.81.958 1.89 1.405l.24.096c.768.3 1.473.492 1.478.494.89.243 1.808.375 2.732.394 1.465 0 2.513-.443 3.115-1.314.93-1.342.842-2.575-.274-3.763l-.151-.154c-.692-.684-1.155-1.69-1.25-1.912-.195-.655-.71-1.383-1.562-1.383-.46.007-.889.233-1.15.605-.25-.31-.495-.553-.715-.694a1.87 1.87 0 00-.993-.312zm14.97 0c.405 0 .767.162 1.017.46.216.262.333.588.333.925.158-.047.322-.071.487-.074.388 0 .738.146.985.409a1.41 1.41 0 01.2 1.722c.22.178.377.422.445.694.06.222.12.69-.2 1.166.244.37.279.836.093 1.236-.238.533-.81.958-1.889 1.405l-.239.096c-.77.3-1.475.492-1.48.494-.89.243-1.808.375-2.732.394-1.465 0-2.513-.443-3.115-1.314-.93-1.342-.842-2.575.274-3.763l.151-.154c.695-.684 1.157-1.69 1.252-1.912.195-.655.708-1.383 1.56-1.383.46.007.889.233 1.15.605.25-.31.495-.553.718-.694.244-.162.523-.265.814-.3l.176-.012z",
			fill: "#FF9D0B"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M9.785 20.132c.688-.994.638-1.74-.305-2.667-.945-.928-1.495-2.288-1.495-2.288s-.205-.788-.672-.714c-.468.074-.81 1.25.17 1.971.977.721-.195 1.21-.573.534-.375-.677-1.405-2.416-1.94-2.751-.532-.332-.907-.148-.782.541.125.687 2.357 2.35 2.14 2.707-.218.362-.983-.42-.983-.42S2.953 14.9 2.43 15.46c-.52.558.398 1.026 1.7 1.803 1.308.778 1.41.985 1.225 1.28-.187.295-3.07-2.1-3.34-1.083-.27 1.011 2.943 1.304 2.745 2.006-.2.7-2.265-1.324-2.685-.537-.425.79 2.913 1.718 2.94 1.725 1.075.276 3.813.859 4.77-.522zm4.432 0c-.687-.994-.64-1.74.305-2.667.943-.928 1.493-2.288 1.493-2.288s.205-.788.675-.714c.465.074.807 1.25-.17 1.971-.98.721.195 1.21.57.534.377-.677 1.407-2.416 1.94-2.751.532-.332.91-.148.782.541-.125.687-2.355 2.35-2.137 2.707.215.362.98-.42.98-.42S21.05 14.9 21.57 15.46c.52.558-.395 1.026-1.7 1.803-1.308.778-1.408.985-1.225 1.28.187.295 3.07-2.1 3.34-1.083.27 1.011-2.94 1.304-2.743 2.006.2.7 2.263-1.324 2.685-.537.423.79-2.912 1.718-2.94 1.725-1.077.276-3.815.859-4.77-.522z",
			fill: "#FFD21E"
		})
	] }));
});
var Color_default$10 = Icon$16;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Kimi/style.js
var TITLE$14 = "Kimi";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Kimi/components/Color.js
function _typeof$15(o) {
	"@babel/helpers - typeof";
	return _typeof$15 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$15(o);
}
var _excluded$15 = ["size", "style"];
function ownKeys$15(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$15(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$15(Object(t), !0).forEach(function(r$1) {
			_defineProperty$15(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$15(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$15(obj, key, value) {
	key = _toPropertyKey$15(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$15(t) {
	var i = _toPrimitive$15(t, "string");
	return "symbol" == _typeof$15(i) ? i : String(i);
}
function _toPrimitive$15(t, r) {
	if ("object" != _typeof$15(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$15(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$15(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$15(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$15(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$15 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$15(_ref, _excluded$15);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$15(_objectSpread$15({
		height: size,
		style: _objectSpread$15({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$14 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M21.846 0a1.923 1.923 0 110 3.846H20.15a.226.226 0 01-.227-.226V1.923C19.923.861 20.784 0 21.846 0z",
			fill: "#1783FF"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.065 11.199l7.257-7.2c.137-.136.06-.41-.116-.41H14.3a.164.164 0 00-.117.051l-7.82 7.756c-.122.12-.302.013-.302-.179V3.82c0-.127-.083-.23-.185-.23H3.186c-.103 0-.186.103-.186.23V19.77c0 .128.083.23.186.23h2.69c.103 0 .186-.102.186-.23v-3.25c0-.069.025-.135.069-.178l2.424-2.406a.158.158 0 01.205-.023l6.484 4.772a7.677 7.677 0 003.453 1.283c.108.012.2-.095.2-.23v-3.06c0-.117-.07-.212-.164-.227a5.028 5.028 0 01-2.027-.807l-5.613-4.064c-.117-.078-.132-.279-.028-.381z",
			fill: "#fff"
		})
	] }));
});
var Color_default$11 = Icon$15;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Kimi/components/Mono.js
function _typeof$14(o) {
	"@babel/helpers - typeof";
	return _typeof$14 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$14(o);
}
var _excluded$14 = ["size", "style"];
function ownKeys$14(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$14(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$14(Object(t), !0).forEach(function(r$1) {
			_defineProperty$14(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$14(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$14(obj, key, value) {
	key = _toPropertyKey$14(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$14(t) {
	var i = _toPrimitive$14(t, "string");
	return "symbol" == _typeof$14(i) ? i : String(i);
}
function _toPrimitive$14(t, r) {
	if ("object" != _typeof$14(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$14(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$14(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$14(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$14(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$14 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$14(_ref, _excluded$14);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$14(_objectSpread$14({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$14({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$14 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M21.846 0a1.923 1.923 0 110 3.846H20.15a.226.226 0 01-.227-.226V1.923C19.923.861 20.784 0 21.846 0z" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M11.065 11.199l7.257-7.2c.137-.136.06-.41-.116-.41H14.3a.164.164 0 00-.117.051l-7.82 7.756c-.122.12-.302.013-.302-.179V3.82c0-.127-.083-.23-.185-.23H3.186c-.103 0-.186.103-.186.23V19.77c0 .128.083.23.186.23h2.69c.103 0 .186-.102.186-.23v-3.25c0-.069.025-.135.069-.178l2.424-2.406a.158.158 0 01.205-.023l6.484 4.772a7.677 7.677 0 003.453 1.283c.108.012.2-.095.2-.23v-3.06c0-.117-.07-.212-.164-.227a5.028 5.028 0 01-2.027-.807l-5.613-4.064c-.117-.078-.132-.279-.028-.381z" })
	] }));
});
var Mono_default$3 = Icon$14;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Minimax/style.js
var TITLE$13 = "Minimax";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Minimax/components/Color.js
function _typeof$13(o) {
	"@babel/helpers - typeof";
	return _typeof$13 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$13(o);
}
var _excluded$13 = ["size", "style"];
function ownKeys$13(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$13(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$13(Object(t), !0).forEach(function(r$1) {
			_defineProperty$13(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$13(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$13(obj, key, value) {
	key = _toPropertyKey$13(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$13(t) {
	var i = _toPrimitive$13(t, "string");
	return "symbol" == _typeof$13(i) ? i : String(i);
}
function _toPrimitive$13(t, r) {
	if ("object" != _typeof$13(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$13(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$13(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$13(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$13(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$13 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$13(_ref, _excluded$13);
	var _useFillId = useFillId(TITLE$13), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$13(_objectSpread$13({
		height: size,
		style: _objectSpread$13({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$13 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			id,
			x1: "0%",
			x2: "100.182%",
			y1: "50.057%",
			y2: "50.057%",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "0%",
				stopColor: "#E2167E"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "100%",
				stopColor: "#FE603C"
			})]
		}) }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M16.278 2c1.156 0 2.093.927 2.093 2.07v12.501a.74.74 0 00.744.709.74.74 0 00.743-.709V9.099a2.06 2.06 0 012.071-2.049A2.06 2.06 0 0124 9.1v6.561a.649.649 0 01-.652.645.649.649 0 01-.653-.645V9.1a.762.762 0 00-.766-.758.762.762 0 00-.766.758v7.472a2.037 2.037 0 01-2.048 2.026 2.037 2.037 0 01-2.048-2.026v-12.5a.785.785 0 00-.788-.753.785.785 0 00-.789.752l-.001 15.904A2.037 2.037 0 0113.441 22a2.037 2.037 0 01-2.048-2.026V18.04c0-.356.292-.645.652-.645.36 0 .652.289.652.645v1.934c0 .263.142.506.372.638.23.131.514.131.744 0a.734.734 0 00.372-.638V4.07c0-1.143.937-2.07 2.093-2.07zm-5.674 0c1.156 0 2.093.927 2.093 2.07v11.523a.648.648 0 01-.652.645.648.648 0 01-.652-.645V4.07a.785.785 0 00-.789-.78.785.785 0 00-.789.78v14.013a2.06 2.06 0 01-2.07 2.048 2.06 2.06 0 01-2.071-2.048V9.1a.762.762 0 00-.766-.758.762.762 0 00-.766.758v3.8a2.06 2.06 0 01-2.071 2.049A2.06 2.06 0 010 12.9v-1.378c0-.357.292-.646.652-.646.36 0 .653.29.653.646V12.9c0 .418.343.757.766.757s.766-.339.766-.757V9.099a2.06 2.06 0 012.07-2.048 2.06 2.06 0 012.071 2.048v8.984c0 .419.343.758.767.758.423 0 .766-.339.766-.758V4.07c0-1.143.937-2.07 2.093-2.07z",
			fill,
			fillRule: "nonzero"
		})
	] }));
});
var Color_default$12 = Icon$13;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Mistral/style.js
var TITLE$12 = "Mistral";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Mistral/components/Color.js
function _typeof$12(o) {
	"@babel/helpers - typeof";
	return _typeof$12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$12(o);
}
var _excluded$12 = ["size", "style"];
function ownKeys$12(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$12(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$12(Object(t), !0).forEach(function(r$1) {
			_defineProperty$12(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$12(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$12(obj, key, value) {
	key = _toPropertyKey$12(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$12(t) {
	var i = _toPrimitive$12(t, "string");
	return "symbol" == _typeof$12(i) ? i : String(i);
}
function _toPrimitive$12(t, r) {
	if ("object" != _typeof$12(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$12(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$12(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$12(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$12(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$12 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$12(_ref, _excluded$12);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$12(_objectSpread$12({
		height: size,
		style: _objectSpread$12({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$12 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.428 3.4h3.429v3.428H3.428V3.4zm13.714 0h3.43v3.428h-3.43V3.4z",
			fill: "gold"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.428 6.828h6.857v3.429H3.429V6.828zm10.286 0h6.857v3.429h-6.857V6.828z",
			fill: "#FFAF00"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.428 10.258h17.144v3.428H3.428v-3.428z",
			fill: "#FF8205"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M3.428 13.686h3.429v3.428H3.428v-3.428zm6.858 0h3.429v3.428h-3.429v-3.428zm6.856 0h3.43v3.428h-3.43v-3.428z",
			fill: "#FA500F"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M0 17.114h10.286v3.429H0v-3.429zm13.714 0H24v3.429H13.714v-3.429z",
			fill: "#E10500"
		})
	] }));
});
var Color_default$13 = Icon$12;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Moonshot/style.js
var TITLE$11 = "MoonshotAI";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Moonshot/components/Mono.js
function _typeof$11(o) {
	"@babel/helpers - typeof";
	return _typeof$11 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$11(o);
}
var _excluded$11 = ["size", "style"];
function ownKeys$11(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$11(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$11(Object(t), !0).forEach(function(r$1) {
			_defineProperty$11(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$11(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$11(obj, key, value) {
	key = _toPropertyKey$11(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$11(t) {
	var i = _toPrimitive$11(t, "string");
	return "symbol" == _typeof$11(i) ? i : String(i);
}
function _toPrimitive$11(t, r) {
	if ("object" != _typeof$11(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$11(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$11(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$11(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$11(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$11 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$11(_ref, _excluded$11);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$11(_objectSpread$11({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$11({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$11 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M1.052 16.916l9.539 2.552a21.007 21.007 0 00.06 2.033l5.956 1.593a11.997 11.997 0 01-5.586.865l-.18-.016-.044-.004-.084-.009-.094-.01a11.605 11.605 0 01-.157-.02l-.107-.014-.11-.016a11.962 11.962 0 01-.32-.051l-.042-.008-.075-.013-.107-.02-.07-.015-.093-.019-.075-.016-.095-.02-.097-.023-.094-.022-.068-.017-.088-.022-.09-.024-.095-.025-.082-.023-.109-.03-.062-.02-.084-.025-.093-.028-.105-.034-.058-.019-.08-.026-.09-.031-.066-.024a6.293 6.293 0 01-.044-.015l-.068-.025-.101-.037-.057-.022-.08-.03-.087-.035-.088-.035-.079-.032-.095-.04-.063-.028-.063-.027a5.655 5.655 0 01-.041-.018l-.066-.03-.103-.047-.052-.024-.096-.046-.062-.03-.084-.04-.086-.044-.093-.047-.052-.027-.103-.055-.057-.03-.058-.032a6.49 6.49 0 01-.046-.026l-.094-.053-.06-.034-.051-.03-.072-.041-.082-.05-.093-.056-.052-.032-.084-.053-.061-.039-.079-.05-.07-.047-.053-.035a7.785 7.785 0 01-.054-.036l-.044-.03-.044-.03a6.066 6.066 0 01-.04-.028l-.057-.04-.076-.054-.069-.05-.074-.054-.056-.042-.076-.057-.076-.059-.086-.067-.045-.035-.064-.052-.074-.06-.089-.073-.046-.039-.046-.039a7.516 7.516 0 01-.043-.037l-.045-.04-.061-.053-.07-.062-.068-.06-.062-.058-.067-.062-.053-.05-.088-.084a13.28 13.28 0 01-.099-.097l-.029-.028-.041-.042-.069-.07-.05-.051-.05-.053a6.457 6.457 0 01-.168-.179l-.08-.088-.062-.07-.071-.08-.042-.049-.053-.062-.058-.068-.046-.056a7.175 7.175 0 01-.027-.033l-.045-.055-.066-.082-.041-.052-.05-.064-.02-.025a11.99 11.99 0 01-1.44-2.402zm-1.02-5.794l11.353 3.037a20.468 20.468 0 00-.469 2.011l10.817 2.894a12.076 12.076 0 01-1.845 2.005L.657 15.923l-.016-.046-.035-.104a11.965 11.965 0 01-.05-.153l-.007-.023a11.896 11.896 0 01-.207-.741l-.03-.126-.018-.08-.021-.097-.018-.081-.018-.09-.017-.084-.018-.094c-.026-.141-.05-.283-.071-.426l-.017-.118-.011-.083-.013-.102a12.01 12.01 0 01-.019-.161l-.005-.047a12.12 12.12 0 01-.034-2.145zm1.593-5.15l11.948 3.196c-.368.605-.705 1.231-1.01 1.875l11.295 3.022c-.142.82-.368 1.612-.668 2.365l-11.55-3.09L.124 10.26l.015-.1.008-.049.01-.067.015-.087.018-.098c.026-.148.056-.295.088-.442l.028-.124.02-.085.024-.097c.022-.09.045-.18.07-.268l.028-.102.023-.083.03-.1.025-.082.03-.096.026-.082.031-.095a11.896 11.896 0 011.01-2.232zm4.442-4.4L17.352 4.59a20.77 20.77 0 00-1.688 1.721l7.823 2.093c.267.852.442 1.744.513 2.665L2.106 5.213l.045-.065.027-.04.04-.055.046-.065.055-.076.054-.072.064-.086.05-.065.057-.073.055-.07.06-.074.055-.069.065-.077.054-.066.066-.077.053-.06.072-.082.053-.06.067-.074.054-.058.073-.078.058-.06.063-.067.168-.17.1-.098.059-.056.076-.071a12.084 12.084 0 012.272-1.677zM12.017 0h.097l.082.001.069.001.054.002.068.002.046.001.076.003.047.002.06.003.054.002.087.005.105.007.144.011.088.007.044.004.077.008.082.008.047.005.102.012.05.006.108.014.081.01.042.006.065.01.207.032.07.012.065.011.14.026.092.018.11.022.046.01.075.016.041.01L14.7.3l.042.01.065.015.049.012.071.017.096.024.112.03.113.03.113.032.05.015.07.02.078.024.073.023.05.016.05.016.076.025.099.033.102.036.048.017.064.023.093.034.11.041.116.045.1.04.047.02.06.024.041.018.063.026.04.018.057.025.11.048.1.046.074.035.075.036.06.028.092.046.091.045.102.052.053.028.049.026.046.024.06.033.041.022.052.029.088.05.106.06.087.051.057.034.053.032.096.059.088.055.098.062.036.024.064.041.084.056.04.027.062.042.062.043.023.017c.054.037.108.075.161.114l.083.06.065.048.056.043.086.065.082.064.04.03.05.041.086.069.079.065.085.071c.712.6 1.353 1.283 1.909 2.031L7.222.994l.062-.027.065-.028.081-.034.086-.035c.113-.045.227-.09.341-.131l.096-.035.093-.033.084-.03.096-.031c.087-.03.176-.058.264-.085l.091-.027.086-.025.102-.03.085-.023.1-.026L9.04.37l.09-.023.091-.022.095-.022.09-.02.098-.021.091-.02.095-.018.092-.018.1-.018.091-.016.098-.017.092-.014.097-.015.092-.013.102-.013.091-.012.105-.012.09-.01.105-.01c.093-.01.186-.018.28-.024l.106-.008.09-.005.11-.006.093-.004.1-.004.097-.002.099-.002.197-.002z" })] }));
});
var Mono_default$4 = Icon$11;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Nvidia/style.js
var TITLE$10 = "Nvidia";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Nvidia/components/Color.js
function _typeof$10(o) {
	"@babel/helpers - typeof";
	return _typeof$10 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$10(o);
}
var _excluded$10 = ["size", "style"];
function ownKeys$10(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$10(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$10(Object(t), !0).forEach(function(r$1) {
			_defineProperty$10(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$10(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$10(obj, key, value) {
	key = _toPropertyKey$10(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$10(t) {
	var i = _toPrimitive$10(t, "string");
	return "symbol" == _typeof$10(i) ? i : String(i);
}
function _toPrimitive$10(t, r) {
	if ("object" != _typeof$10(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$10(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$10(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$10(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$10(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$10 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$10(_ref, _excluded$10);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$10(_objectSpread$10({
		height: size,
		style: _objectSpread$10({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$10 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M10.212 8.976V7.62c.127-.01.256-.017.388-.021 3.596-.117 5.957 3.184 5.957 3.184s-2.548 3.647-5.282 3.647a3.227 3.227 0 01-1.063-.175v-4.109c1.4.174 1.681.812 2.523 2.258l1.873-1.627a4.905 4.905 0 00-3.67-1.846 6.594 6.594 0 00-.729.044m0-4.476v2.025c.13-.01.259-.019.388-.024 5.002-.174 8.261 4.226 8.261 4.226s-3.743 4.69-7.643 4.69c-.338 0-.675-.031-1.007-.092v1.25c.278.038.558.057.838.057 3.629 0 6.253-1.91 8.794-4.169.421.347 2.146 1.193 2.501 1.564-2.416 2.083-8.048 3.763-11.24 3.763-.308 0-.603-.02-.894-.048V19.5H24v-15H10.21zm0 9.756v1.068c-3.356-.616-4.287-4.21-4.287-4.21a7.173 7.173 0 014.287-2.138v1.172h-.005a3.182 3.182 0 00-2.502 1.178s.615 2.276 2.507 2.931m-5.961-3.3c1.436-1.935 3.604-3.148 5.961-3.336V6.523C5.81 6.887 2 10.723 2 10.723s2.158 6.427 8.21 7.015v-1.166C5.77 16 4.25 10.958 4.25 10.958h-.002z",
		fill: "#74B71B",
		fillRule: "nonzero"
	})] }));
});
var Color_default$14 = Icon$10;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenAI/style.js
var TITLE$9 = "OpenAI";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenAI/components/Mono.js
function _typeof$9(o) {
	"@babel/helpers - typeof";
	return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$9(o);
}
var _excluded$9 = ["size", "style"];
function ownKeys$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$9(Object(t), !0).forEach(function(r$1) {
			_defineProperty$9(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$9(obj, key, value) {
	key = _toPropertyKey$9(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$9(t) {
	var i = _toPrimitive$9(t, "string");
	return "symbol" == _typeof$9(i) ? i : String(i);
}
function _toPrimitive$9(t, r) {
	if ("object" != _typeof$9(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$9(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$9(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$9(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$9(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$9 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$9(_ref, _excluded$9);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$9(_objectSpread$9({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$9({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$9 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" })] }));
});
var Mono_default$5 = Icon$9;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenCode/style.js
var TITLE$8 = "opencode";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenCode/components/Mono.js
function _typeof$8(o) {
	"@babel/helpers - typeof";
	return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$8(o);
}
var _excluded$8 = ["size", "style"];
function ownKeys$8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$8(Object(t), !0).forEach(function(r$1) {
			_defineProperty$8(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$8(obj, key, value) {
	key = _toPropertyKey$8(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$8(t) {
	var i = _toPrimitive$8(t, "string");
	return "symbol" == _typeof$8(i) ? i : String(i);
}
function _toPrimitive$8(t, r) {
	if ("object" != _typeof$8(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$8(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$8(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$8(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$8(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$8 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$8(_ref, _excluded$8);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$8(_objectSpread$8({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$8({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$8 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M16 6H8v12h8V6zm4 16H4V2h16v20z" })] }));
});
var Mono_default$6 = Icon$8;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenRouter/style.js
var TITLE$7 = "OpenRouter";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/OpenRouter/components/Color.js
function _typeof$7(o) {
	"@babel/helpers - typeof";
	return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$7(o);
}
var _excluded$7 = ["size", "style"];
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), !0).forEach(function(r$1) {
			_defineProperty$7(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$7(obj, key, value) {
	key = _toPropertyKey$7(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$7(t) {
	var i = _toPrimitive$7(t, "string");
	return "symbol" == _typeof$7(i) ? i : String(i);
}
function _toPrimitive$7(t, r) {
	if ("object" != _typeof$7(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$7(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$7(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$7(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$7(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$7 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$7(_ref, _excluded$7);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$7(_objectSpread$7({
		height: size,
		style: _objectSpread$7({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$7 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M18.654 3.87a5.087 5.087 0 110 10.174L23.7 19.09c.64.641.187 1.737-.72 1.737H8.48a8.479 8.479 0 010-16.958h10.175zM8.479 7.26a5.087 5.087 0 100 10.176 5.087 5.087 0 000-10.175z",
		fill: "#C8FF00"
	})] }));
});
var Color_default$15 = Icon$7;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Qwen/style.js
var TITLE$6 = "Qwen";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Qwen/components/Color.js
function _typeof$6(o) {
	"@babel/helpers - typeof";
	return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$6(o);
}
var _excluded$6 = ["size", "style"];
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r$1) {
			_defineProperty$6(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$6(obj, key, value) {
	key = _toPropertyKey$6(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$6(t) {
	var i = _toPrimitive$6(t, "string");
	return "symbol" == _typeof$6(i) ? i : String(i);
}
function _toPrimitive$6(t, r) {
	if ("object" != _typeof$6(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$6(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$6(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$6(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$6(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$6 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$6(_ref, _excluded$6);
	var _useFillId = useFillId(TITLE$6), id = _useFillId.id, fill = _useFillId.fill;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$6(_objectSpread$6({
		height: size,
		style: _objectSpread$6({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$6 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z",
			fill,
			fillRule: "nonzero"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			id,
			x1: "0%",
			x2: "100%",
			y1: "0%",
			y2: "0%",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "0%",
				stopColor: "#6336E7",
				stopOpacity: ".84"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "100%",
				stopColor: "#6F69F7",
				stopOpacity: ".84"
			})]
		}) })
	] }));
});
var Color_default$16 = Icon$6;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Together/style.js
var TITLE$5 = "together.ai";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Together/components/Color.js
function _typeof$5(o) {
	"@babel/helpers - typeof";
	return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$5(o);
}
var _excluded$5 = ["size", "style"];
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r$1) {
			_defineProperty$5(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$5(obj, key, value) {
	key = _toPropertyKey$5(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$5(t) {
	var i = _toPrimitive$5(t, "string");
	return "symbol" == _typeof$5(i) ? i : String(i);
}
function _toPrimitive$5(t, r) {
	if ("object" != _typeof$5(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$5(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$5(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$5(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$5(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$5 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$5(_ref, _excluded$5);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$5(_objectSpread$5({
		height: size,
		style: _objectSpread$5({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$5 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M23.197 4.503A6 6 0 0015 2.307a5.973 5.973 0 00-2.995 4.933l5.996.008v.515h-5.996c.039.937.298 1.87.8 2.74a6 6 0 1010.39-6z",
			fill: "#EF2CC1"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M.805 4.5A6 6 0 003 12.697a5.972 5.972 0 005.77.127L5.779 7.627l.446-.257 2.997 5.192A6 6 0 10.804 4.5z",
			fill: "#CAAEF5"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M12 23.894a6 6 0 005.999-6c0-2.13-1.1-3.996-2.775-5.06l-3.005 5.189-.444-.258 2.997-5.192A6 6 0 1012 23.894z",
			fill: "#FC4C02"
		})
	] }));
});
var Color_default$17 = Icon$5;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Vercel/style.js
var TITLE$4 = "Vercel";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/Vercel/components/Mono.js
function _typeof$4(o) {
	"@babel/helpers - typeof";
	return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$4(o);
}
var _excluded$4 = ["size", "style"];
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r$1) {
			_defineProperty$4(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$4(obj, key, value) {
	key = _toPropertyKey$4(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$4(t) {
	var i = _toPrimitive$4(t, "string");
	return "symbol" == _typeof$4(i) ? i : String(i);
}
function _toPrimitive$4(t, r) {
	if ("object" != _typeof$4(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$4(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$4(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$4(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$4(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$4 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$4(_ref, _excluded$4);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$4(_objectSpread$4({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$4({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$4 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 0l12 20.785H0L12 0z" })] }));
});
var Mono_default$7 = Icon$4;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/VertexAI/style.js
var TITLE$3 = "VertexAI";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/VertexAI/components/Color.js
function _typeof$3(o) {
	"@babel/helpers - typeof";
	return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$3(o);
}
var _excluded$3 = ["size", "style"];
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r$1) {
			_defineProperty$3(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$3(obj, key, value) {
	key = _toPropertyKey$3(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$3(t) {
	var i = _toPrimitive$3(t, "string");
	return "symbol" == _typeof$3(i) ? i : String(i);
}
function _toPrimitive$3(t, r) {
	if ("object" != _typeof$3(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$3(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$3(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$3(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$3(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$3 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$3(_ref, _excluded$3);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$3(_objectSpread$3({
		height: size,
		style: _objectSpread$3({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$3 }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.995 20.216a1.892 1.892 0 100 3.785 1.892 1.892 0 000-3.785zm0 2.806a.927.927 0 11.927-.914.914.914 0 01-.927.914z",
			fill: "#4285F4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M21.687 14.144c.237.038.452.16.605.344a.978.978 0 01-.18 1.3l-8.24 6.082a1.892 1.892 0 00-1.147-1.508l8.28-6.08a.991.991 0 01.682-.138z",
			fill: "#669DF6",
			fillRule: "evenodd"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M10.122 21.842l-8.217-6.066a.952.952 0 01-.206-1.287.978.978 0 011.287-.206l8.28 6.08a1.893 1.893 0 00-1.144 1.479z",
			fill: "#AECBFA",
			fillRule: "evenodd"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M4.273 4.475a.978.978 0 01-.965-.965V1.09a.978.978 0 111.943 0v2.42a.978.978 0 01-.978.965zM4.247 13.034a.978.978 0 100-1.956.978.978 0 000 1.956zM4.247 10.19a.978.978 0 100-1.956.978.978 0 000 1.956zM4.247 7.332a.978.978 0 100-1.956.978.978 0 000 1.956z",
			fill: "#AECBFA"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M19.718 7.307a.978.978 0 01-.965-.979v-2.42a.965.965 0 011.93 0v2.42a.964.964 0 01-.965.979zM19.743 13.047a.978.978 0 100-1.956.978.978 0 000 1.956zM19.743 10.151a.978.978 0 100-1.956.978.978 0 000 1.956zM19.743 2.068a.978.978 0 100-1.956.978.978 0 000 1.956z",
			fill: "#4285F4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M11.995 15.917a.978.978 0 01-.965-.965v-2.459a.978.978 0 011.943 0v2.433a.976.976 0 01-.978.991zM11.995 18.762a.978.978 0 100-1.956.978.978 0 000 1.956zM11.995 10.64a.978.978 0 100-1.956.978.978 0 000 1.956zM11.995 7.783a.978.978 0 100-1.956.978.978 0 000 1.956z",
			fill: "#669DF6"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M15.856 10.177a.978.978 0 01-.965-.965v-2.42a.977.977 0 011.702-.763.979.979 0 01.241.763v2.42a.978.978 0 01-.978.965zM15.869 4.913a.978.978 0 100-1.956.978.978 0 000 1.956zM15.869 15.853a.978.978 0 100-1.956.978.978 0 000 1.956zM15.869 12.996a.978.978 0 100-1.956.978.978 0 000 1.956z",
			fill: "#4285F4"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: "M8.121 15.853a.978.978 0 100-1.956.978.978 0 000 1.956zM8.121 7.783a.978.978 0 100-1.956.978.978 0 000 1.956zM8.121 4.913a.978.978 0 100-1.957.978.978 0 000 1.957zM8.134 12.996a.978.978 0 01-.978-.94V9.611a.965.965 0 011.93 0v2.445a.966.966 0 01-.952.94z",
			fill: "#AECBFA"
		})
	] }));
});
var Color_default$18 = Icon$3;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/XAI/style.js
var TITLE$2 = "Grok";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/XAI/components/Mono.js
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$2(o);
}
var _excluded$2 = ["size", "style"];
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r$1) {
			_defineProperty$2(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$2(obj, key, value) {
	key = _toPropertyKey$2(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : String(i);
}
function _toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$2(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$2(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$2 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$2(_ref, _excluded$2);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$2(_objectSpread$2({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$2({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$2 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6.469 8.776L16.512 23h-4.464L2.005 8.776H6.47zm-.004 7.9l2.233 3.164L6.467 23H2l4.465-6.324zM22 2.582V23h-3.659V7.764L22 2.582zM22 1l-9.952 14.095-2.233-3.163L17.533 1H22z" })] }));
});
var Mono_default$8 = Icon$2;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/XiaomiMiMo/style.js
var TITLE$1 = "XiaomiMiMo";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/XiaomiMiMo/components/Mono.js
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$1(o);
}
var _excluded$1 = ["size", "style"];
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r$1) {
			_defineProperty$1(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$1(obj, key, value) {
	key = _toPropertyKey$1(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : String(i);
}
function _toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$1(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$1(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon$1 = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties$1(_ref, _excluded$1);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread$1(_objectSpread$1({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread$1({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE$1 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M.958 15.936a.459.459 0 01.459.44v2.729a.46.46 0 01-.918 0v-2.729a.459.459 0 01.459-.44zm4.814-2.035a.46.46 0 01.553.45v4.754a.458.458 0 11-.918 0V15.48L3.74 17.202a.462.462 0 01-.655.016.462.462 0 01-.065-.082L.628 14.67a.459.459 0 01.658-.637l2.124 2.187 2.127-2.188a.46.46 0 01.235-.13zm2.068.004a.46.46 0 01.458.445v4.755a.46.46 0 01-.458.458.459.459 0 01-.458-.458V14.35a.459.459 0 01.458-.445zm1.973 2.014a.46.46 0 01.46.457v2.729a.46.46 0 01-.784.324.46.46 0 01-.134-.324v-2.729a.46.46 0 01.458-.458zm.002-2.045a.458.458 0 01.328.157l2.127 2.19 2.125-2.19a.459.459 0 01.784.318v4.756a.46.46 0 01-.455.458.46.46 0 01-.458-.458V15.48l-1.667 1.723a.46.46 0 01-.65.008l-.005-.005c0-.002-.002-.002-.004-.003l-2.455-2.534a.46.46 0 01-.008-.667.461.461 0 01.338-.128zm6.797 1.206a.46.46 0 01.53.651A1.966 1.966 0 0019.81 18.4a.462.462 0 01.623.18.46.46 0 01-.181.624 2.863 2.863 0 01-1.38.353l-.142-.004a2.88 2.88 0 01-2.393-4.263.461.461 0 01.274-.21zm.864-.931a2.884 2.884 0 013.915 3.914.46.46 0 01-.402.24l-.057-.004a.458.458 0 01-.164-.055.46.46 0 01-.182-.622 1.967 1.967 0 00-2.669-2.67.459.459 0 11-.441-.803zM9.59 6.368c1.481 0 1.696 1.202 1.696 1.654v2.648h-.917v-.432c-.26.346-.792.535-1.36.535-.133 0-1.289-.03-1.384-1.136-.082-.932.675-1.61 2.053-1.61h.691c0-.563-.367-.886-.983-.886-.44.013-.864.174-1.2.458l-.36-.664c.484-.379 1.012-.567 1.764-.567zm4.427.1c1.263 0 2.082.97 2.083 2.15 0 1.181-.824 2.154-2.083 2.154-1.26 0-2.084-.972-2.084-2.152 0-1.18.82-2.153 2.084-2.153zm6.801.015c.68 0 1.202.465 1.197 1.548v2.642H21.1V8.29c0-.312-.002-.98-.63-.98s-.628.667-.628.838v2.524h-.89V8.148c0-.17-.001-.838-.63-.838-.628 0-.628.668-.628.98v2.383h-.917v-4.03h.917V7a1.22 1.22 0 01.947-.516c.398 0 .76.193.982.686a1.321 1.321 0 011.195-.686zm-18.093.872l1.457-1.772H5.32L3.311 8.07l2.14 2.602H4.24L2.725 8.796 1.21 10.672H0L2.138 8.07.13 5.583h1.138l1.458 1.772zm4.149 3.317h-.916V6.644h.916v4.028zm16.99 0h-.916V6.644h.916v4.028zM9.925 8.71c-1.055 0-1.359.412-1.326.742.032.329.324.537.757.537a1.013 1.013 0 001.014-.968l.002-.31h-.447zM14.018 7.3c-.663 0-1.184.487-1.184 1.32 0 .832.52 1.32 1.184 1.32.662 0 1.182-.49 1.182-1.32 0-.832-.52-1.32-1.182-1.32zM6.417 5.001a.568.568 0 01.587.582.588.588 0 01-1.175 0A.57.57 0 016.417 5zm16.991 0a.57.57 0 01.592.582.588.588 0 01-1.174 0 .57.57 0 01.357-.542.572.572 0 01.225-.04z" })] }));
});
var Mono_default$9 = Icon$1;

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/ZAI/style.js
var TITLE = "Z.ai";

//#endregion
//#region node_modules/.pnpm/@lobehub+icons@5.16.0_@types+react@18.3.31_react@18.3.1/node_modules/@lobehub/icons/es/ZAI/components/Mono.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof(o);
}
var _excluded = ["size", "style"];
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
			_defineProperty(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var Icon = /* @__PURE__ */ (0, react.memo)(function(_ref) {
	var _ref$size = _ref.size, size = _ref$size === void 0 ? "1em" : _ref$size, style = _ref.style, rest = _objectWithoutProperties(_ref, _excluded);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", _objectSpread(_objectSpread({
		fill: "currentColor",
		fillRule: "evenodd",
		height: size,
		style: _objectSpread({
			flex: "none",
			lineHeight: 1
		}, style),
		viewBox: "0 0 24 24",
		width: size,
		xmlns: "http://www.w3.org/2000/svg"
	}, rest), {}, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: TITLE }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12.105 2L9.927 4.953H.653L2.83 2h9.276zM23.254 19.048L21.078 22h-9.242l2.174-2.952h9.244zM24 2L9.264 22H0L14.736 2H24z" })] }));
});
var Mono_default$10 = Icon;

//#endregion
//#region src/client/ProviderGlyph.tsx
/**
* Brands whose mark switches variants with the theme: Kimi's colour K is
* white-filled and only reads on dark, so light mode shows the Mono mark.
* Both render and CSS picks one, so a theme toggle needs no re-render.
*/
const THEMED_GLYPHS = { "kimi-coding": {
	light: Mono_default$3,
	dark: Color_default$11
} };
/**
* pi-ai provider id → brand glyph. Several ids share one brand (regional
* twins, subscription routes), which is why this maps ids explicitly.
*/
const GLYPHS = {
	"amazon-bedrock": Color_default$3,
	"ant-ling": Color_default,
	anthropic: Color_default$1,
	"azure-openai-responses": Color_default$2,
	baseten: Mono_default,
	cerebras: Color_default$4,
	"cloudflare-ai-gateway": Color_default$5,
	"cloudflare-workers-ai": Color_default$5,
	deepseek: Color_default$7,
	fireworks: Color_default$8,
	"github-copilot": Mono_default$1,
	google: Color_default$9,
	"google-vertex": Color_default$18,
	groq: Mono_default$2,
	huggingface: Color_default$10,
	minimax: Color_default$12,
	"minimax-cn": Color_default$12,
	mistral: Color_default$13,
	moonshotai: Mono_default$4,
	"moonshotai-cn": Mono_default$4,
	nvidia: Color_default$14,
	openai: Mono_default$5,
	"openai-codex": Color_default$6,
	opencode: Mono_default$6,
	"opencode-go": Mono_default$6,
	openrouter: Color_default$15,
	"qwen-token-plan": Color_default$16,
	"qwen-token-plan-cn": Color_default$16,
	"qwen-token-plan-individual": Color_default$16,
	together: Color_default$17,
	"vercel-ai-gateway": Mono_default$7,
	xai: Mono_default$8,
	xiaomi: Mono_default$9,
	"xiaomi-token-plan-ams": Mono_default$9,
	"xiaomi-token-plan-cn": Mono_default$9,
	"xiaomi-token-plan-sgp": Mono_default$9,
	zai: Mono_default$10,
	"zai-coding-cn": Mono_default$10
};
/**
* Render one provider's brand mark.
* @returns the glyph, or a first-letter monogram for a brand the library does
*   not ship.
*/
function ProviderGlyph({ provider, displayName, size = 18 }) {
	const themed = THEMED_GLYPHS[provider];
	if (themed !== void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(themed.light, {
		size,
		className: `${AccountsSection_module_css_default.glyph} ${AccountsSection_module_css_default.lightOnly}`
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(themed.dark, {
		size,
		className: `${AccountsSection_module_css_default.glyph} ${AccountsSection_module_css_default.darkOnly}`
	})] });
	const Glyph = GLYPHS[provider];
	if (Glyph === void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: AccountsSection_module_css_default.monogram,
		"aria-hidden": "true",
		style: {
			width: size,
			height: size
		},
		children: displayName.slice(0, 1).toUpperCase()
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Glyph, {
		size,
		className: AccountsSection_module_css_default.glyph
	});
}

//#endregion
//#region src/errors.ts
/** Human text for a failure, without leaking a stack into a UI or an HTTP body. */
function errorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}

//#endregion
//#region src/wire.ts
/**
* The HTTP contract between this plugin's Host half and its browser half.
*
* dsh's API gateway method table is closed to out-of-tree plugins, so the Host
* registers its own routes on `ctx.webServer` and the browser half fetches
* them same-origin. Both halves ship from this package and inline this file,
* so the contract has one source instead of two kept in sync.
*/
/**
* Prefix every route of this plugin lives under.
*
* Deliberately NOT under `/plugins/<package>`: the client-module registry owns
* `/plugins` and serves this package's browser bundle at
* `/plugins/dsh-providers/client.js`. The webserver matches the longest
* prefix, so a route there would capture that request and answer JS with JSON.
*/
const PROVIDERS_ROUTE_PREFIX = "/dsh-providers";

//#endregion
//#region src/client/store.ts
/** Value of {@link AccountsState.updating} while the page-level update runs. */
const ALL_PROVIDERS = "*";
/** A provider may emit repeated informational steps during one flow. */
const MAX_INFO_MESSAGES = 64;
/** Source of {@link LoginInfo.id}; the wizard is one flow at a time. */
let nextInfoId = 0;
const INITIAL = {
	status: "idle",
	error: null,
	providers: [],
	selected: null,
	filter: "",
	login: null,
	loggingOut: null,
	routing: null,
	updating: null,
	catalogNotice: null,
	expandedModels: null,
	discovering: null,
	confirmingLogout: null
};
/** Whether a provider can serve a request right now. */
function providerUsable(view) {
	return view.configured && view.error === void 0;
}
/** Fold one login event into the wizard state. */
function reduceLogin(previous, event) {
	switch (event.type) {
		case "auth_url": return {
			...previous,
			authUrl: event.url,
			instructions: event.instructions ?? null
		};
		case "device_code": return {
			...previous,
			deviceCode: {
				userCode: event.userCode,
				verificationUri: event.verificationUri
			}
		};
		case "info": return {
			...previous,
			infos: [...previous.infos, {
				id: nextInfoId++,
				message: event.message,
				links: event.links ?? []
			}].slice(-MAX_INFO_MESSAGES)
		};
		case "progress": return {
			...previous,
			progress: event.message
		};
		case "prompt": {
			const { type: _type,...prompt } = event;
			return {
				...previous,
				answering: false,
				prompt,
				prefillPromptId: previous.prefillPromptId ?? prompt.requestId
			};
		}
		case "prompt_done": return previous.prompt?.requestId === event.requestId ? {
			...previous,
			prompt: null,
			answering: false
		} : previous;
		case "done": return {
			...previous,
			done: true,
			prompt: null,
			answering: false,
			progress: null,
			storedKey: null
		};
		case "error": return {
			...previous,
			error: event.message,
			prompt: null,
			answering: false,
			progress: null
		};
	}
}
/** The accounts page controller and its snapshot source. */
var AccountsStore = class {
	state = INITIAL;
	listeners = /* @__PURE__ */ new Set();
	/** The open event stream, closed when the wizard closes or the flow settles. */
	stream;
	/** Increments per load so a slow reply cannot publish over a newer one. */
	generation = 0;
	/** Increments per login attempt so a slow start cannot drive a newer wizard. */
	loginGeneration = 0;
	/** @param origin - where the account plane is served; the page's own origin. */
	constructor(origin = "") {
		this.origin = origin;
	}
	getSnapshot() {
		return this.state;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}
	/** Publish the next state; the snapshot identity moves only when the state does. */
	set(next) {
		this.state = {
			...this.state,
			...next
		};
		for (const listener of this.listeners) listener();
	}
	/** Update the wizard through its reducer, if one is open. */
	reduce(event) {
		const login = this.state.login;
		if (login === null) return;
		this.set({ login: reduceLogin(login, event) });
	}
	/** Call one account route, surfacing the Host's own message on refusal. */
	async call(path, init) {
		const response = await fetch(`${this.origin}${PROVIDERS_ROUTE_PREFIX}/${path}`, {
			...init,
			headers: {
				"content-type": "application/json",
				...init?.headers
			}
		});
		const text = await response.text();
		let parsed = {};
		try {
			parsed = text.length > 0 ? JSON.parse(text) : {};
		} catch {
			throw new Error(`${response.status} ${response.statusText}`);
		}
		if (!response.ok) throw new Error(parsed.error ?? `${response.status} ${response.statusText}`);
		return parsed;
	}
	/**
	* Load every provider row. A failed refresh of an already loaded page keeps
	* the page and shows the error beside it, rather than replacing loaded data
	* with a blank error screen.
	*/
	async load() {
		const generation = this.generation += 1;
		if (this.state.status === "idle") this.set({ status: "loading" });
		try {
			const { providers } = await this.call("providers");
			if (generation !== this.generation) return;
			this.set({
				status: "ready",
				error: null,
				providers
			});
		} catch (error) {
			if (generation !== this.generation) return;
			this.set({
				...this.state.status === "ready" ? {} : { status: "error" },
				error: errorMessage(error)
			});
		}
	}
	/** Open one provider's card, or close it when it is the one already open. */
	select(providerId) {
		this.set({ selected: this.state.selected === providerId ? null : providerId });
	}
	/** Filter the provider list. */
	filter(value) {
		this.set({ filter: value });
	}
	/** The open wizard, when login attempt `generation` still owns it. */
	currentLogin(providerId, generation) {
		const login = this.state.login;
		if (login === null || login.provider !== providerId || generation !== this.loginGeneration) return null;
		return login;
	}
	/** Open the wizard and start one login flow. */
	async beginLogin(providerId, method) {
		const generation = this.loginGeneration += 1;
		this.closeStream();
		this.set({ login: {
			provider: providerId,
			method,
			loginId: null,
			authUrl: null,
			instructions: null,
			deviceCode: null,
			progress: null,
			infos: [],
			prompt: null,
			answering: false,
			storedKey: null,
			peekingKey: false,
			prefillPromptId: null,
			done: false,
			error: null
		} });
		try {
			const { loginId } = await this.call("login", {
				method: "POST",
				body: JSON.stringify({
					provider: providerId,
					method
				})
			});
			const started = this.currentLogin(providerId, generation);
			if (started === null) return;
			this.set({ login: {
				...started,
				loginId
			} });
			this.openStream(loginId);
		} catch (error) {
			if (this.currentLogin(providerId, generation) === null) return;
			this.reduce({
				type: "error",
				message: errorMessage(error)
			});
		}
	}
	/** Attach to one flow's event stream, replacing any stream still open. */
	openStream(loginId) {
		this.closeStream();
		const stream = new EventSource(`${this.origin}${PROVIDERS_ROUTE_PREFIX}/events?loginId=${encodeURIComponent(loginId)}`);
		this.stream = stream;
		stream.addEventListener("message", (message) => {
			const event = JSON.parse(message.data);
			this.reduce(event);
			if (event.type === "done") {
				this.closeStream();
				this.load();
				return;
			}
			if (event.type === "error") this.closeStream();
		});
		stream.addEventListener("error", () => {
			if (this.state.login?.done === true || this.state.login?.error !== null) return;
			this.closeStream();
			this.reduce({
				type: "error",
				message: "the login stream closed unexpectedly"
			});
		});
	}
	/** Close the event stream if one is open. */
	closeStream() {
		this.stream?.close();
		this.stream = void 0;
	}
	/** Answer the wizard's current question. */
	async answer(value) {
		const login = this.state.login;
		if (login === null || login.prompt === null || login.loginId === null) return;
		const { requestId } = login.prompt;
		this.set({ login: {
			...login,
			answering: true
		} });
		try {
			await this.call("answer", {
				method: "POST",
				body: JSON.stringify({
					loginId: login.loginId,
					requestId,
					value
				})
			});
		} catch (error) {
			this.reduce({
				type: "info",
				message: errorMessage(error)
			});
			this.reduce({
				type: "prompt_done",
				requestId
			});
		}
	}
	/** Abort the flow and close the wizard. */
	async closeLogin() {
		const login = this.state.login;
		this.closeStream();
		this.set({ login: null });
		if (login === null || login.loginId === null || login.done) return;
		try {
			await this.call("cancel", {
				method: "POST",
				body: JSON.stringify({ loginId: login.loginId })
			});
		} catch {}
	}
	/**
	* Reveal the key currently stored for the wizard's provider. An explicit
	* user action, api-key flows only; the Host answers nothing for a provider
	* whose credential is an OAuth account or an ambient environment value.
	*/
	async peekStoredKey() {
		const login = this.state.login;
		if (login === null || login.method !== "api_key" || login.peekingKey || login.storedKey !== null) return;
		const generation = this.loginGeneration;
		this.set({ login: {
			...login,
			peekingKey: true
		} });
		try {
			const { key } = await this.call(`stored-key?provider=${encodeURIComponent(login.provider)}`);
			const current = this.currentLogin(login.provider, generation);
			if (current !== null) this.set({ login: {
				...current,
				peekingKey: false,
				storedKey: key ?? null
			} });
		} catch (error) {
			const current = this.currentLogin(login.provider, generation);
			if (current !== null) this.set({ login: {
				...current,
				peekingKey: false
			} });
			this.reduce({
				type: "info",
				message: errorMessage(error)
			});
		}
	}
	/** Clear a busy marker, unless a newer operation has claimed it since. */
	release(field, token) {
		if (this.state[field] === token) this.set({ [field]: null });
	}
	/**
	* Refresh model catalogs from the curated remote catalog. The button means
	* "update now", so the request bypasses the Host's freshness window.
	* @param providerId - one provider, or undefined for every routed one.
	* @param summarize - renders the reply; the copy lives with the section.
	*/
	async updateCatalog(providerId, summarize) {
		const token = providerId ?? ALL_PROVIDERS;
		this.set({
			updating: token,
			catalogNotice: null
		});
		try {
			const result = await this.call("refresh-catalog", {
				method: "POST",
				body: JSON.stringify({
					force: true,
					...providerId === void 0 ? {} : { provider: providerId }
				})
			});
			await this.load();
			if (this.state.updating === token) this.set({ catalogNotice: summarize(result) });
		} catch (error) {
			if (this.state.updating === token) this.set({ catalogNotice: {
				tone: "warn",
				text: errorMessage(error)
			} });
		} finally {
			this.release("updating", token);
		}
	}
	/** Open or close the endpoint-discovery field for one provider. */
	askDiscover(providerId, baseURL = "") {
		this.set({ discovering: providerId === null ? null : {
			provider: providerId,
			baseURL
		} });
	}
	/** Edit the endpoint the discovery field will interrogate. */
	editDiscoverUrl(baseURL) {
		const discovering = this.state.discovering;
		if (discovering === null) return;
		this.set({ discovering: {
			...discovering,
			baseURL
		} });
	}
	/** Read an OpenAI-compatible listing and adopt it as this provider's model list. */
	async discoverEndpoint(providerId, baseURL, summarize) {
		this.set({
			updating: providerId,
			catalogNotice: null
		});
		try {
			const { count } = await this.call("discover-endpoint", {
				method: "POST",
				body: JSON.stringify({
					provider: providerId,
					...baseURL.trim().length === 0 ? {} : { baseURL }
				})
			});
			await this.load();
			if (this.state.updating === providerId) this.set({
				discovering: null,
				catalogNotice: {
					tone: "ok",
					text: summarize(count)
				}
			});
		} catch (error) {
			if (this.state.updating === providerId) this.set({ catalogNotice: {
				tone: "warn",
				text: errorMessage(error)
			} });
		} finally {
			this.release("updating", providerId);
		}
	}
	/** Show a provider's whole model list rather than its preview. */
	expandModels(providerId) {
		this.set({ expandedModels: providerId });
	}
	/** Ask for confirmation before signing out; sign-out is not undoable. */
	askLogout(providerId) {
		this.set({ confirmingLogout: providerId });
	}
	/** Wire one provider into the Models page without signing in again. */
	async route(providerId) {
		this.set({ routing: providerId });
		try {
			await this.call("route", {
				method: "POST",
				body: JSON.stringify({ provider: providerId })
			});
			await this.load();
		} catch (error) {
			this.set({ error: errorMessage(error) });
		} finally {
			this.release("routing", providerId);
		}
	}
	/** Remove one provider's credential. */
	async logout(providerId, removeRoute) {
		this.set({
			loggingOut: providerId,
			confirmingLogout: null
		});
		try {
			await this.call("logout", {
				method: "POST",
				body: JSON.stringify({
					provider: providerId,
					unroute: removeRoute
				})
			});
			await this.load();
		} catch (error) {
			this.set({ error: errorMessage(error) });
		} finally {
			this.release("loggingOut", providerId);
		}
	}
	/** Close any open stream; called when the plugin unloads. */
	dispose() {
		this.closeStream();
		this.listeners.clear();
	}
};

//#endregion
//#region src/client/ProviderRow.tsx
/**
* A timestamp to the minute. No seconds, and a year only when it is not the
* current one: a token lives for hours and a catalog is checked within days,
* so "how long ago" is all the reader wants — but a catalog left unchecked
* since last summer must not read as tomorrow.
*/
function formatMoment(epochMs) {
	const date = new Date(epochMs);
	return date.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		...date.getFullYear() !== (/* @__PURE__ */ new Date()).getFullYear() ? { year: "numeric" } : {},
		hour: "2-digit",
		minute: "2-digit"
	});
}
/** The one-line status phrase for a provider. */
function statusText(view, t) {
	if (view.credential === "oauth") return t("statusSignedIn");
	if (view.credential === "api_key") return t("statusApiKey");
	if (view.configured) return t("statusAmbient", { source: view.source ?? "—" });
	return t("statusMissing");
}
/**
* The state dot, rendered only when there is a state to report. Most rows are
* simply not signed in and already say so in words; a dot on all thirty of
* them would drown out the two that matter.
*/
function StatusDot({ view }) {
	if (view.error !== void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.StateDot, {
		state: "error",
		size: 8
	});
	if (providerUsable(view)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.StateDot, {
		state: "done",
		size: 8
	});
	return null;
}
/** The label one sign-in method carries, given whether the provider is already connected. */
function methodLabel(method, connected, t) {
	if (method.type === "api_key") return connected ? t("replaceApiKey") : t("signInApiKey");
	if (connected) return t("signInAgain");
	return method.loginLabel ?? t("signInOauthNamed", { name: method.name });
}
/** Render one provider row and, while open, its card. */
function ProviderRow({ view, open, t, loggingOut, routing, updating, expandedModels, discovering, onToggle, onLogin, onRoute, onUpdateCatalog, onAskDiscover, onEditDiscoverUrl, onDiscover, onToggleModels, onAskLogout }) {
	const expired = view.expires !== void 0 && view.expires <= Date.now();
	const subscription = view.methods.some((method) => method.subscription === true);
	const connected = view.credential !== void 0;
	const models = view.models ?? [];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: `${AccountsSection_module_css_default.row} ${open ? AccountsSection_module_css_default.rowOpen : ""}`,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			type: "button",
			"data-provider-id": view.id,
			"aria-expanded": open,
			className: AccountsSection_module_css_default.rowSummary,
			onClick: () => onToggle(view.id),
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ProviderGlyph, {
					provider: view.id,
					displayName: view.displayName
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.rowName,
					children: view.displayName
				}),
				subscription && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.badge,
					children: t("subscription")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.rowStatus,
					children: statusText(view, t)
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatusDot, { view }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: open ? AccountsSection_module_css_default.chevronOpen : AccountsSection_module_css_default.chevron })
			]
		}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: AccountsSection_module_css_default.card,
			children: [
				(view.expires !== void 0 || view.catalogCheckedAt !== void 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
					className: AccountsSection_module_css_default.meta,
					children: [
						view.expires !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: expired ? AccountsSection_module_css_default.warn : void 0,
							children: expired ? t("expired") : t("expiresAt", { time: formatMoment(view.expires) })
						}),
						view.expires !== void 0 && view.catalogCheckedAt !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "·"
						}),
						view.catalogCheckedAt !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("catalogChecked", { time: formatMoment(view.catalogCheckedAt) }) })
					]
				}),
				view.error !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: AccountsSection_module_css_default.error,
					children: view.error
				}),
				view.routed && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.models,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: AccountsSection_module_css_default.modelsHead,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: AccountsSection_module_css_default.modelsLabel,
									children: t("models", { count: models.length })
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: AccountsSection_module_css_default.grow }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "ghost",
									size: "sm",
									disabled: updating,
									onClick: () => onUpdateCatalog(view.id),
									children: updating ? t("updatingCatalog") : t("updateCatalog")
								}),
								view.discoverable === true && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "ghost",
									size: "sm",
									disabled: updating,
									onClick: () => onAskDiscover(discovering === null ? view.id : null, view.baseURL ?? ""),
									children: t("discoverEndpoint")
								})
							]
						}),
						discovering !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
							className: AccountsSection_module_css_default.discover,
							onSubmit: (event) => {
								event.preventDefault();
								onDiscover(view.id, discovering);
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Input, {
									className: AccountsSection_module_css_default.discoverInput,
									value: discovering,
									placeholder: view.baseURL ?? "https://…/v1",
									"aria-label": t("discoverEndpointLabel"),
									onChange: (event) => onEditDiscoverUrl(event.target.value)
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
									type: "submit",
									variant: "outline",
									size: "sm",
									disabled: updating,
									children: updating ? t("discoveringEndpoint") : t("discoverSubmit")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => onAskDiscover(null),
									children: t("cancel")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: AccountsSection_module_css_default.hint,
									children: t("discoverHint")
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModelList, {
							models,
							expanded: expandedModels,
							t,
							onToggleExpand: () => onToggleModels(view.id)
						})
					]
				}),
				view.configured && !view.routed && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.notice,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AccountsSection_module_css_default.warn,
						children: t("noRoute")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "outline",
						size: "sm",
						disabled: routing,
						onClick: () => onRoute(view.id),
						children: routing ? t("routing") : t("routeNow")
					})]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.actions,
					children: [view.methods.map((method) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: !connected && method.type === "oauth" ? "primary" : "outline",
						onClick: () => onLogin(view.id, method.type),
						children: methodLabel(method, connected, t)
					}, method.type)), connected && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "ghost",
						className: AccountsSection_module_css_default.destructive,
						disabled: loggingOut,
						onClick: () => onAskLogout(view.id),
						children: loggingOut ? t("signingOut") : t("signOut")
					})]
				}),
				view.methods.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: AccountsSection_module_css_default.hint,
					children: t("noMethods")
				}),
				view.credential === void 0 && view.configured && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.factRef,
					children: t("reference", { ref: view.ref })
				})
			]
		})]
	});
}

//#endregion
//#region src/client/AccountsSection.tsx
/**
* One line for what a catalog update did. A batch that updated thirty-nine
* providers and failed on one is neither a success nor a failure, so the
* changed count leads and the failures are named.
*/
function summarizeUpdate(result, t) {
	const changed = result.updated.filter((update) => update.changed);
	const failed = result.errors;
	if (failed.length > 0) return {
		tone: "warn",
		text: t("catalogPartial", {
			count: failed.length,
			providers: failed.map((error) => error.provider).join(", "),
			reason: failed[0]?.message ?? ""
		})
	};
	if (changed.length === 0) return {
		tone: "ok",
		text: t("catalogUnchanged")
	};
	return {
		tone: "ok",
		text: t("catalogUpdated", {
			count: changed.length,
			models: changed.reduce((total, update) => total + update.count, 0)
		})
	};
}
/** Whether one provider matches the current filter, by id or display name. */
function matches(view, needle) {
	if (needle.length === 0) return true;
	const lowered = needle.toLowerCase();
	return view.id.toLowerCase().includes(lowered) || view.displayName.toLowerCase().includes(lowered);
}
/**
* Render the Accounts settings page.
* @returns the page, or null before the inject face is bound.
*/
function AccountsSection({ controller, useSnapshot, t }) {
	return controller !== void 0 && useSnapshot !== void 0 && t !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Page, {
		controller,
		useSnapshot,
		t
	}) : null;
}
/** The page proper, with the inject face proven present. */
function Page({ controller, useSnapshot, t }) {
	const status = useSnapshot((state) => state.status);
	const error = useSnapshot((state) => state.error);
	const providers = useSnapshot((state) => state.providers);
	const openRow = useSnapshot((state) => state.selected);
	const filter = useSnapshot((state) => state.filter);
	const login = useSnapshot((state) => state.login);
	const loggingOut = useSnapshot((state) => state.loggingOut);
	const routing = useSnapshot((state) => state.routing);
	const updating = useSnapshot((state) => state.updating);
	const catalogNotice = useSnapshot((state) => state.catalogNotice);
	const expandedModels = useSnapshot((state) => state.expandedModels);
	const discovering = useSnapshot((state) => state.discovering);
	const confirmingLogout = useSnapshot((state) => state.confirmingLogout);
	(0, react.useEffect)(() => {
		controller.load();
	}, [controller]);
	(0, react.useEffect)(() => {
		const refresh = () => {
			if (document.visibilityState === "visible") controller.load();
		};
		window.addEventListener("focus", refresh);
		document.addEventListener("visibilitychange", refresh);
		return () => {
			window.removeEventListener("focus", refresh);
			document.removeEventListener("visibilitychange", refresh);
		};
	}, [controller]);
	const visible = providers.filter((view) => matches(view, filter));
	const connected = visible.filter((view) => view.credential !== void 0 || view.configured);
	const rest = visible.filter((view) => view.credential === void 0 && !view.configured);
	const rowProps = {
		t,
		onToggle: (providerId) => controller.select(providerId),
		onLogin: (providerId, method) => {
			controller.beginLogin(providerId, method);
		},
		onRoute: (providerId) => {
			controller.route(providerId);
		},
		onUpdateCatalog: (providerId) => {
			controller.updateCatalog(providerId, (result) => summarizeUpdate(result, t));
		},
		onAskDiscover: (providerId, baseURL) => {
			controller.askDiscover(providerId, baseURL);
		},
		onEditDiscoverUrl: (baseURL) => controller.editDiscoverUrl(baseURL),
		onDiscover: (providerId, baseURL) => {
			controller.discoverEndpoint(providerId, baseURL, (count) => t("discovered", { count }));
		},
		onToggleModels: (providerId) => {
			controller.expandModels(expandedModels === providerId ? null : providerId);
		},
		onAskLogout: (providerId) => controller.askLogout(providerId)
	};
	const group = (label, rows) => rows.length === 0 ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
		className: AccountsSection_module_css_default.group,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
			className: AccountsSection_module_css_default.groupLabel,
			children: label
		}), rows.map((view) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ProviderRow, {
			view,
			open: openRow === view.id,
			loggingOut: loggingOut === view.id,
			routing: routing === view.id,
			updating: updating === view.id || updating === ALL_PROVIDERS,
			expandedModels: expandedModels === view.id,
			discovering: discovering?.provider === view.id ? discovering.baseURL : null,
			...rowProps
		}, view.id))]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: AccountsSection_module_css_default.section,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: AccountsSection_module_css_default.intro,
				children: t("intro")
			}),
			error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AccountsSection_module_css_default.notice,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: AccountsSection_module_css_default.error,
					children: error
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "outline",
					size: "sm",
					onClick: () => void controller.load(),
					children: t("retry")
				})]
			}),
			status === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: AccountsSection_module_css_default.hint,
				children: t("loading")
			}),
			status === "ready" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.toolbar,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Input, {
						className: AccountsSection_module_css_default.search,
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconSearchOutline16, {}),
						value: filter,
						placeholder: t("search"),
						"aria-label": t("search"),
						onChange: (event) => controller.filter(event.target.value)
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "outline",
						disabled: updating !== null,
						onClick: () => void controller.updateCatalog(void 0, (result) => summarizeUpdate(result, t)),
						children: updating === ALL_PROVIDERS ? t("updatingCatalogs") : t("updateCatalogs")
					})]
				}),
				catalogNotice !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: `${AccountsSection_module_css_default.catalogNotice} ${catalogNotice.tone === "warn" ? AccountsSection_module_css_default.warn : ""}`,
					children: catalogNotice.text
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AccountsSection_module_css_default.list,
					children: [
						group(t("groupConnected"), connected),
						group(t("groupAll"), rest),
						visible.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: AccountsSection_module_css_default.hint,
							children: t("empty")
						})
					]
				})
			] }),
			confirmingLogout !== null && (() => {
				const target = providers.find((candidate) => candidate.id === confirmingLogout);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LogoutDialog, {
					providerName: target?.displayName ?? confirmingLogout,
					routed: target?.routed === true,
					busy: loggingOut === confirmingLogout,
					t,
					onCancel: () => controller.askLogout(null),
					onConfirm: (removeRoute) => void controller.logout(confirmingLogout, removeRoute)
				});
			})(),
			login !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LoginDialog, {
				flow: login,
				providerName: providers.find((candidate) => candidate.id === login.provider)?.displayName ?? login.provider,
				t,
				onAnswer: (value) => void controller.answer(value),
				onPeekKey: () => void controller.peekStoredKey(),
				onClose: () => void controller.closeLogin()
			})
		]
	});
}

//#endregion
//#region src/client/locales.ts
/** Copy dictionaries for the Accounts settings section. */
/** Chinese strings; dsh's product copy is Chinese, so this pair leads. */
const zh = {
	nav: "账户",
	intro: "登录模型提供方。订阅账号走 OAuth 授权，其余填 API 密钥；两者都会自动接到模型选择器里。",
	search: "搜索提供方",
	groupConnected: "已连接",
	groupAll: "全部提供方",
	empty: "没有匹配的提供方。",
	loading: "加载中…",
	retry: "重试",
	statusSignedIn: "已登录",
	statusApiKey: "已配置 API 密钥",
	statusAmbient: "由环境提供（{source}）",
	statusMissing: "未配置",
	expiresAt: "有效期至 {time}",
	expired: "访问令牌已过期，下次请求时自动续期；若续期失败会在此提示重新登录。",
	reference: "凭据引用 {ref}",
	noRoute: "还没出现在「模型」页，模型不会进入选择器。",
	routeNow: "加入「模型」页",
	routing: "写入中…",
	subscription: "订阅",
	models: "可用模型（{count}）",
	modelsEmpty: "这条路由目前没有模型。",
	modelsExpand: "展开其余 {count} 个",
	modelsCollapse: "收起",
	modalityImage: "图像",
	updateCatalogs: "更新模型目录",
	updatingCatalogs: "更新中…",
	updateCatalog: "更新目录",
	updatingCatalog: "更新中…",
	catalogChecked: "目录更新于 {time}",
	catalogUpdated: "{count} 个提供方的目录有更新，现共 {models} 个模型。",
	catalogUnchanged: "模型目录已是最新。",
	catalogPartial: "{count} 个提供方更新失败（{providers}）：{reason}。其余更新已生效。",
	discoverEndpoint: "从端点获取…",
	discoverEndpointLabel: "OpenAI 兼容端点地址",
	discoverSubmit: "获取",
	discoveringEndpoint: "获取中…",
	discoverHint: "读取该端点的 /v1/models 清单并整体替换模型列表。适合目录里没有的自建或代理端点；端点只报告 id，模态与协议仍沿用目录已知的值。",
	discovered: "端点报告了 {count} 个模型，已写入。",
	signInOauthNamed: "使用 {name} 登录",
	signInApiKey: "填写 API 密钥",
	signInAgain: "重新登录",
	replaceApiKey: "更换 API 密钥",
	signOut: "退出登录",
	signingOut: "退出中…",
	logoutTitle: "退出 {provider}？",
	logoutDescription: "将删除本机保存的凭据。想再用就得重新登录一次。",
	logoutConfirm: "退出登录",
	removeRoute: "同时从「模型」页移除该提供方",
	removeRouteHint: "那条记录可能还带着你自己改过的模型列表或网关地址，默认保留。",
	noMethods: "这个提供方没有可交互的登录方式，它使用本机凭据（如 AWS 配置文件、ADC 文件）。",
	loginTitle: "登录 {provider}",
	openLink: "打开授权页面",
	copyLink: "复制链接",
	copied: "已复制",
	deviceCodeTitle: "在浏览器中输入以下代码",
	deviceCodeUrl: "打开验证页面",
	waiting: "等待授权完成…",
	submit: "提交",
	cancel: "取消",
	close: "关闭",
	done: "登录成功。",
	loginFailed: "登录失败",
	secretPlaceholder: "粘贴密钥",
	revealSecret: "显示密钥",
	hideSecret: "隐藏密钥"
};
/** English strings. */
const en = {
	nav: "Accounts",
	intro: "Sign in to model providers. Subscription accounts use OAuth; the rest take an API key. Either way the models reach the picker.",
	search: "Search providers",
	groupConnected: "Connected",
	groupAll: "All providers",
	empty: "No provider matches.",
	loading: "Loading…",
	retry: "Retry",
	statusSignedIn: "Signed in",
	statusApiKey: "API key configured",
	statusAmbient: "From the environment ({source})",
	statusMissing: "Not configured",
	expiresAt: "Valid until {time}",
	expired: "Access token expired; it renews on the next request. A failed renewal reports here asking to sign in again.",
	reference: "Credential reference {ref}",
	noRoute: "Not on the Models page yet, so its models never reach the picker.",
	routeNow: "Add to the Models page",
	routing: "Writing…",
	subscription: "Subscription",
	models: "Models ({count})",
	modelsEmpty: "This route serves no models yet.",
	modelsExpand: "Show {count} more",
	modelsCollapse: "Show fewer",
	modalityImage: "Images",
	updateCatalogs: "Update model catalogs",
	updatingCatalogs: "Updating…",
	updateCatalog: "Update catalog",
	updatingCatalog: "Updating…",
	catalogChecked: "Catalog checked {time}",
	catalogUpdated: "{count} provider catalog(s) changed; {models} models served.",
	catalogUnchanged: "Model catalogs are up to date.",
	catalogPartial: "{count} provider(s) could not be updated ({providers}): {reason}. The rest were applied.",
	discoverEndpoint: "Read an endpoint…",
	discoverEndpointLabel: "OpenAI-compatible endpoint",
	discoverSubmit: "Read",
	discoveringEndpoint: "Reading…",
	discoverHint: "Reads this endpoint’s /v1/models listing and replaces the model list with it. Meant for a self-hosted or proxied endpoint the catalog does not cover; a listing reports ids only, so modalities and protocol keep whatever the catalog already knew.",
	discovered: "The endpoint reported {count} models, now recorded.",
	signInOauthNamed: "Sign in with {name}",
	signInApiKey: "Enter an API key",
	signInAgain: "Sign in again",
	replaceApiKey: "Replace the API key",
	signOut: "Sign out",
	signingOut: "Signing out…",
	logoutTitle: "Sign out of {provider}?",
	logoutDescription: "The credential stored on this machine is deleted. Using it again means signing in again.",
	logoutConfirm: "Sign out",
	removeRoute: "Also remove it from the Models page",
	removeRouteHint: "That entry may still carry a model list or gateway URL you edited yourself, so it is kept by default.",
	noMethods: "This provider offers no interactive login; it uses local credentials such as an AWS profile or ADC files.",
	loginTitle: "Sign in to {provider}",
	openLink: "Open the authorization page",
	copyLink: "Copy the link",
	copied: "Copied",
	deviceCodeTitle: "Enter this code in your browser",
	deviceCodeUrl: "Open the verification page",
	waiting: "Waiting for the authorization to complete…",
	submit: "Submit",
	cancel: "Cancel",
	close: "Close",
	done: "Signed in.",
	loginFailed: "Login failed",
	secretPlaceholder: "Paste the key",
	revealSecret: "Show the key",
	hideSecret: "Hide the key"
};

//#endregion
//#region src/client/index.ts
/** Dictionary namespace owned by this plugin. */
const NS = "settings.accounts";
/**
* Required services. The target slot is declared by the settings base
* package, whose activation order relative to this one is not constrained —
* registration waits on the declaration through `slots.inject()`, not on a
* service edge.
*/
const inject = ["slots", "locale"];
/** Register the Accounts section and its copy. */
function apply(ctx) {
	ctx.effect(() => ctx.locale.register(NS, {
		zh,
		en
	}), "dsh-providers: copy dictionaries");
	const controller = new AccountsStore();
	const useSnapshot = (0, __deepseek_ai_dsh_client_web_react.bindSnapshotSelector)(controller);
	ctx.effect(() => () => controller.dispose(), "dsh-providers: account store");
	const t = ctx.locale.bind(NS);
	const injected = () => ({
		controller,
		useSnapshot,
		t
	});
	ctx.slots.inject("settings.section", () => ctx.slots.register({
		name: "settings.section",
		id: "accounts",
		order: 11,
		label: () => t("nav"),
		inject: injected
	}, AccountsSection));
}

//#endregion
exports.apply = apply;
exports.inject = inject;
return module.exports; } });
//# sourceMappingURL=client.js.map