"use client";

import { useEffect, useState } from "react";
import { useSiteContent, type SiteContent } from "@/app/user/dashboard/components/contentStore";

export default function AdminContentPage() {
  const { content, updateContent, resetContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<"dashboard" | "tips" | "footer">(
    "dashboard"
  );

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const saveChanges = () => {
    updateContent(draft);
  };

  const updateCategory = (
    index: number,
    key: keyof SiteContent["dashboard"]["categories"][number],
    value: string
  ) => {
    setDraft((prev) => {
      const categories = [...prev.dashboard.categories];
      categories[index] = { ...categories[index], [key]: value };
      return { ...prev, dashboard: { ...prev.dashboard, categories } };
    });
  };

  const updateTip = (
    index: number,
    key: keyof SiteContent["tips"]["items"][number],
    value: string
  ) => {
    setDraft((prev) => {
      const items = [...prev.tips.items];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, tips: { ...prev.tips, items } };
    });
  };

  return (
    <div className="space-y-6 text-black">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
          <p className="text-sm text-gray-500">
            Manage dashboard categories, daily tips, and footer content.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetContent}
            className="rounded border border-red-300 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Reset Default
          </button>
          <button
            onClick={saveChanges}
            className="rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`rounded px-4 py-2 text-sm font-semibold ${
            activeTab === "dashboard"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("tips")}
          className={`rounded px-4 py-2 text-sm font-semibold ${
            activeTab === "tips" ? "bg-green-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          Tips
        </button>
        <button
          onClick={() => setActiveTab("footer")}
          className={`rounded px-4 py-2 text-sm font-semibold ${
            activeTab === "footer"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Footer
        </button>
      </div>

      {activeTab === "dashboard" && (
        <section className="space-y-4 rounded-md bg-white p-5 shadow">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard Categories</h2>
          <div>
            <label className="mb-1 block text-sm font-medium">Section Title</label>
            <input
              value={draft.dashboard.categoriesTitle}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  dashboard: { ...prev.dashboard, categoriesTitle: event.target.value },
                }))
              }
              className="w-full rounded border p-2"
            />
          </div>

          <div className="space-y-4">
            {draft.dashboard.categories.map((category, index) => (
              <div key={category.id} className="rounded border p-4">
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Card {index + 1}
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <input
                    value={category.title}
                    onChange={(event) =>
                      updateCategory(index, "title", event.target.value)
                    }
                    placeholder="Title"
                    className="rounded border p-2"
                  />
                  <input
                    value={category.count}
                    onChange={(event) =>
                      updateCategory(index, "count", event.target.value)
                    }
                    placeholder="Count text"
                    className="rounded border p-2"
                  />
                  <input
                    value={category.subtitle}
                    onChange={(event) =>
                      updateCategory(index, "subtitle", event.target.value)
                    }
                    placeholder="Subtitle"
                    className="rounded border p-2 md:col-span-2"
                  />
                  <input
                    value={category.image}
                    onChange={(event) =>
                      updateCategory(index, "image", event.target.value)
                    }
                    placeholder="Image path"
                    className="rounded border p-2"
                  />
                  <input
                    value={category.sideImage}
                    onChange={(event) =>
                      updateCategory(index, "sideImage", event.target.value)
                    }
                    placeholder="Side image path"
                    className="rounded border p-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "tips" && (
        <section className="space-y-4 rounded-md bg-white p-5 shadow">
          <h2 className="text-lg font-semibold text-gray-800">Tips Content</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              value={draft.tips.sectionLabel}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  tips: { ...prev.tips, sectionLabel: event.target.value },
                }))
              }
              placeholder="Section Label"
              className="rounded border p-2"
            />
            <input
              value={draft.tips.heading}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  tips: { ...prev.tips, heading: event.target.value },
                }))
              }
              placeholder="Heading"
              className="rounded border p-2"
            />
          </div>

          {draft.tips.items.map((tip, index) => (
            <div key={tip.id} className="rounded border p-4">
              <p className="mb-2 text-sm font-semibold text-gray-700">Tip {index + 1}</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  value={tip.emoji}
                  onChange={(event) => updateTip(index, "emoji", event.target.value)}
                  placeholder="Emoji"
                  className="rounded border p-2"
                />
                <input
                  value={tip.title}
                  onChange={(event) => updateTip(index, "title", event.target.value)}
                  placeholder="Title"
                  className="rounded border p-2"
                />
                <input
                  value={tip.level}
                  onChange={(event) => updateTip(index, "level", event.target.value)}
                  placeholder="Level"
                  className="rounded border p-2"
                />
                <input
                  value={tip.frequency}
                  onChange={(event) =>
                    updateTip(index, "frequency", event.target.value)
                  }
                  placeholder="Frequency"
                  className="rounded border p-2"
                />
                <textarea
                  value={tip.description}
                  onChange={(event) =>
                    updateTip(index, "description", event.target.value)
                  }
                  placeholder="Description"
                  rows={3}
                  className="rounded border p-2 md:col-span-2"
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {activeTab === "footer" && (
        <section className="space-y-4 rounded-md bg-white p-5 shadow">
          <h2 className="text-lg font-semibold text-gray-800">Footer Content</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              value={draft.footer.brandName}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, brandName: event.target.value },
                }))
              }
              placeholder="Brand name"
              className="rounded border p-2"
            />
            <input
              value={draft.footer.tagline}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, tagline: event.target.value },
                }))
              }
              placeholder="Tagline"
              className="rounded border p-2"
            />
            <input
              value={draft.footer.email}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, email: event.target.value },
                }))
              }
              placeholder="Email"
              className="rounded border p-2"
            />
            <input
              value={draft.footer.phone}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, phone: event.target.value },
                }))
              }
              placeholder="Phone"
              className="rounded border p-2"
            />
            <textarea
              value={draft.footer.aboutText}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, aboutText: event.target.value },
                }))
              }
              rows={3}
              placeholder="About text"
              className="rounded border p-2 md:col-span-2"
            />
            <input
              value={draft.footer.copyright}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, copyright: event.target.value },
                }))
              }
              placeholder="Copyright text"
              className="rounded border p-2 md:col-span-2"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">Quick Links Labels</p>
            {draft.footer.quickLinks.map((link, index) => (
              <div key={link.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <input
                  value={link.label}
                  onChange={(event) =>
                    setDraft((prev) => {
                      const quickLinks = [...prev.footer.quickLinks];
                      quickLinks[index] = { ...quickLinks[index], label: event.target.value };
                      return { ...prev, footer: { ...prev.footer, quickLinks } };
                    })
                  }
                  className="rounded border p-2"
                />
                <input
                  value={link.href}
                  onChange={(event) =>
                    setDraft((prev) => {
                      const quickLinks = [...prev.footer.quickLinks];
                      quickLinks[index] = { ...quickLinks[index], href: event.target.value };
                      return { ...prev, footer: { ...prev.footer, quickLinks } };
                    })
                  }
                  className="rounded border p-2"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
